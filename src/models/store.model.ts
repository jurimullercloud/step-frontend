import { IUser } from "./user.model";

export interface IToken {
    accessToken: string | null;
    expiresOn:   string | null;
    user?: IUser
}
export interface IAuth extends IToken {
    isAuthenticated: boolean;
}