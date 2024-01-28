import { SetMetadata } from "@nestjs/common";
import { UserPermission } from "src/common/permission.enum";

export const Permission = (permission: UserPermission) => SetMetadata('permission', permission);