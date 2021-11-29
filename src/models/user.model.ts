export interface IUser {
    id: number;
    username: string;
}

export interface IUserAuth {
    username: string | null;
    password: string | null;    
}