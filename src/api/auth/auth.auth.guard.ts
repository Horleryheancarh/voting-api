import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, ROLES, Role } from 'src/constants/metadata';
import { Accounts } from 'src/database/models/Accounts.model';

@Injectable()
export class AuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // allow pass-through if public endpoint
      return true;
    }

    if (!(await super.canActivate(context))) throw new UnauthorizedException();

    //if jwt-auth guard is activated, then extract the user from http context.

    const user = context.switchToHttp().getRequest()?.user;
    if (!user) throw new UnauthorizedException();

    //now verify roles.
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES, [
        context.getHandler(),
        context.getClass(),
      ]) || [];
    if (!requiredRoles.every((role: Role) => this.verifyRole(role, user))) {
      throw new ForbiddenException();
    }

    return true;
  }

  private verifyRole(role: Role, user: Accounts) {
    if (user.role === Role.ADMIN) return true; // admin is a superior role.
    return user.role === role;
  }
}
