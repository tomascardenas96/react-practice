import { SetMetadata } from "@nestjs/common";
import { UserPermission } from "src/common/enum/permission.enum";

export const Permission = (permission: UserPermission) => SetMetadata('permission', permission);