import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { AuthService } from './auth.service';
import { AuthenticatedAccountDto } from './dtos/AuthenticatedAccountDto';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @Post('register')
  @Public()
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<APIResponse<AuthenticatedAccountDto>> {
    const createdAccount = await this.authService.createAccount(registerDto);

    return new APIResponse<AuthenticatedAccountDto>({
      account: createdAccount,
      token: await this.authService.signAccount(createdAccount),
    } as AuthenticatedAccountDto);
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @Post('login')
  @HttpCode(200)
  @Public()
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<APIResponse<AuthenticatedAccountDto>> {
    const account = await this.authService.login(loginDto);

    return new APIResponse<AuthenticatedAccountDto>({
      account: account,
      token: await this.authService.signAccount(account),
    } as AuthenticatedAccountDto);
  }
}
