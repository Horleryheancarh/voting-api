import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/auth';
import { APIResponse } from 'src/types/APIResponse';
import { AuthService } from './auth.service';
import { AuthenticatedAccountDto } from './dtos/AuthenticatedAccountDto';
import { LoginDto } from './dtos/LoginDto';
import { RegisterDto } from './dtos/RegisterDto';

@ApiBadRequestResponse({
  description: 'Bad request Response',
  type: BadRequestException,
})
@ApiUnauthorizedResponse({
  description: 'Unathorized',
  type: UnauthorizedException,
})
@ApiNotFoundResponse({
  description: 'Not Found',
  type: NotFoundException,
})
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiCreatedResponse({
    description: 'Success',
    type: AuthenticatedAccountDto,
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
  @ApiOkResponse({
    description: 'Success',
    type: AuthenticatedAccountDto,
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
