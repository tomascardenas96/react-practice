import { Permission } from "./permission.decorator";
import { UserPermission } from "../enum/permission.enum";
import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from "src/auth/guard/auth.guard";
import { PermissionGuard } from "src/auth/guard/permission.guard";

export function Auth(permission: UserPermission) {
    return applyDecorators (
        Permission(permission),
        UseGuards(AuthGuard, PermissionGuard)
    )
}