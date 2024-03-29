import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Accounts } from 'src/database/models/Accounts.model';
import { AuthUser, Public, RequiresAdminRole } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { AccountService } from './account.service';
import { ResetPasswordDto } from './dtos/ResetPasswordDto';
import { UpdatePasswordDto } from './dtos/UpdatePasswordDto';
import { UpdateProfileDto } from './dtos/UpdateProfileDto';
import { UsernameDto } from './dtos/UsernameDto';

@ApiBadRequestResponse({
  description: 'Bad request Response',
  type: BadRequestException,
})
@ApiUnauthorizedResponse({
  description: 'Unathorized',
  type: UnauthorizedException,
})
@Controller('accounts')
@ApiTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: 'Get current user Profile',
  })
  @Get('profile')
  @ApiBearerAuth()
  async getProfileById(@AuthUser() user: Accounts): Promise<Accounts> {
    return await this.accountService.getProfileById(user._id);
  }

  @ApiOperation({
    summary: 'Update current user Profile',
  })
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

  @ApiOperation({
    summary: 'Reset user password',
  })
  @Post('reset_password')
  @HttpCode(200)
  @Public()
  async requestPasswordReset(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.accountService.triggerResetPassword(resetPasswordDto);
  }

  @ApiOperation({
    summary: 'Update user password',
  })
  @Put('password')
  @HttpCode(200)
  @Public()
  async resetPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    await this.accountService.updatePassword(updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Check if username is free',
  })
  @Get('usernames/:username')
  @Public()
  async checkUsername(
    @Param() usernameDto: UsernameDto,
  ): Promise<APIResponse<string>> {
    const status = await this.accountService.checkIfUsername(usernameDto);

    return new APIResponse<string>(status);
  }

  @ApiOperation({
    summary: 'Make user with {username} admin',
  })
  @Put('usernames/:username')
  @RequiresAdminRole()
  async makeAdmin(
    @Param() usernameDto: UsernameDto,
  ): Promise<APIResponse<string>> {
    const status = await this.accountService.makeAdmin(usernameDto);

    return new APIResponse<string>(status);
  }

  @ApiOperation({
    summary: 'Search user with {username}',
  })
  @Put('search/:username')
  @ApiBearerAuth()
  async searchUser(
    @Param() usernameDto: UsernameDto,
  ): Promise<APIResponse<Accounts>> {
    const account = await this.accountService.searchUser(usernameDto);

    return new APIResponse<Accounts>(account);
  }
}
