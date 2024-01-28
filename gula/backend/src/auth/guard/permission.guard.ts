import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermission } from 'src/common/permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.getAllAndOverride<UserPermission>(
      'permission',
      [context.getHandler(), context.getClass()],
    );
    if (!permission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (user.permission === UserPermission.ADMIN) {
      return true;
    }

    return permission === user.permission;
  }
}
