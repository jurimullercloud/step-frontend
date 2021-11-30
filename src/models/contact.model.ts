export interface IBaseContact {
    name: string;
    phone: number;
}
export interface IContact extends IBaseContact {
    id: number;
    user_id: number
}

export interface IFormContact {
    name: string;
    phone: string;
}