import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC_KEY, ROLES } from 'src/constants/metadata';
import { Role } from 'src/database/models/Accounts.model';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RequireRoles = (...roles: string[]) => SetMetadata(ROLES, roles);
export const RequiresAdminRole = () => RequireRoles(Role.ADMIN);

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
