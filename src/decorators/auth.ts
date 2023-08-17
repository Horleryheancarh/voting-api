import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC_KEY, ROLES, Role } from 'src/constants/metadata';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RequireRoles = (...roles: string[]) => SetMetadata(ROLES, roles);
export const RequiresAdminRole = () => RequireRoles(Role.ADMIN);

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
