import { UserPermission } from "../enum/permission.enum";

export interface ActiveUserInterface {
    userId: number;
    username: string;
    permission: UserPermission;
}