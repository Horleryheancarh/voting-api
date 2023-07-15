import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Accounts } from 'src/database/models/Accounts.model';
import { AuthUser, Public } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { AccountService } from './account.service';
import { ResetPasswordDto } from './dtos/ResetPasswordDto';
import { UpdatePasswordDto } from './dtos/UpdatePasswordDto';
import { UpdateProfileDto } from './dtos/UpdateProfileDto';
import { UsernameDto } from './dtos/UsernameDto';

@Controller('accounts')
@ApiTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('profile')
  @ApiBearerAuth()
  async getProfileById(@AuthUser() user: Accounts): Promise<Accounts> {
    return await this.accountService.getProfileById(user._id);
  }

  @Put('profile')
  @ApiBearerAuth()
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @AuthUser() user: Accounts,
  ): Promise<APIResponse<Accounts>> {
    const updatedAccount = await this.accountService.updateProfile(
      user._id,
      body,
    );
    return new APIResponse<Accounts>(updatedAccount);
  }

  @Post('reset_password')
  @HttpCode(200)
  @Public()
  async requestPasswordReset(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.accountService.triggerResetPassword(resetPasswordDto);
  }

  @Put('password')
  @Put('password')
  @HttpCode(200)
  @Public()
  async resetPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    await this.accountService.updatePassword(updatePasswordDto);
  }

  @Get('usernames/:username')
  @Public()
  async checkUsername(
    @Param() usernameDto: UsernameDto,
  ): Promise<APIResponse<string>> {
    const status = await this.accountService.checkIfUsername(usernameDto);

    return new APIResponse<string>(status);
  }
}
