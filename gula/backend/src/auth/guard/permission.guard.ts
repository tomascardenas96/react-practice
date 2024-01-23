import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride('permission', [
      context.getHandler(),
      context.getClass()
    ])
    if(!permission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user);

    return permission === user.permission;
  }
}
