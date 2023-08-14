import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import {
  Accounts,
  AccountDocument,
  Role,
} from 'src/database/models/Accounts.model';
import {
  ITokenPurpose,
  TokenDocument,
  Tokens,
} from 'src/database/models/Tokens.model';
import { ResetPasswordDto } from './dtos/ResetPasswordDto';
import { UpdatePasswordDto } from './dtos/UpdatePasswordDto';
import { UpdateProfileDto } from './dtos/UpdateProfileDto';
import { UsernameDto } from './dtos/UsernameDto';
import { MailerService } from '../notification/mailer.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Accounts.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(Tokens.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly mailerService: MailerService,
  ) {}

  async getProfileById(userId: string) {
    const account = await this.accountModel
      .findById(userId)
      .select('-password');

    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async updateProfile(userId: string, body: UpdateProfileDto) {
    const account = await this.accountModel.findById(userId);

    if (body.phone) {
      const owner = await this.accountModel.findOne({
        phone: body.phone,
      });
      if (owner && owner.id !== account.id) {
        throw new ConflictException('Phone number already in use');
      }
    }

    if (body.username) {
      const owner = await this.accountModel.findOne({
        username: body.username,
      });
      if (owner && owner.id !== account.id) {
        throw new ConflictException('Username already in use');
      }
    }
    await account.updateOne(body);
    return await this.accountModel.findById(userId);
  }

  async triggerResetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    const account = await this.accountModel.findOne({
      email,
    });

    if (!account) {
      throw new NotFoundException('Invalid email address');
    }

    const token = v4();
    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + 2);

    const previousToken = await this.tokenModel.findOne({
      userId: account.id,
      purpose: ITokenPurpose.RESET_PASSWORD,
    });

    const html = `<p>Reset your password with the ${token}</p>`;

    if (previousToken) {
      await previousToken.updateOne({
        token,
        expiresAt,
      });

      await this.mailerService.sendEmail(email, 'Password Reset', html);
    } else {
      await this.tokenModel.create({
        userId: account.id,
        token,
        expiresAt,
        purpose: ITokenPurpose.RESET_PASSWORD,
      });

      await this.mailerService.sendEmail(email, 'Password Reset', html);
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { email, password, confirmPassword, token } = updatePasswordDto;
    const account = await this.accountModel.findOne({ email });

    if (!account) {
      throw new NotFoundException('Incorrect email address');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Password and confirm password must match');
    }

    const savedToken = await this.tokenModel.findOne({
      token,
      userId: account._id,
    });
    if (!savedToken || savedToken.expiresAt.getTime() < new Date().getTime()) {
      throw new BadRequestException('Invalid token supplied');
    }

    const hash = await bcrypt.hash(password, 10);
    await account.updateOne({ password: hash });
    await savedToken.deleteOne();
  }

  async checkIfUsername(usernameDto: UsernameDto): Promise<string> {
    const account = await this.accountModel.findOne({
      username: usernameDto.username,
    });

    if (account) throw new ConflictException('Username exists');
    return 'Username does not exist';
  }

  async makeAdmin(usernameDto: UsernameDto, role: Role): Promise<string> {
    const account = await this.accountModel.findOne({
      username: usernameDto.username,
    });

    if (!account) throw new NotFoundException('Account not Found');

    await account.updateOne({ role: Role.ADMIN });

    return 'Made User Admin';
  }

  async searchUser(usernameDto: UsernameDto): Promise<Accounts> {
    const account = await this.accountModel.findOne({
      username: usernameDto.username,
    });

    if (!account) throw new NotFoundException('Account not Found');

    return account;
  }
}
