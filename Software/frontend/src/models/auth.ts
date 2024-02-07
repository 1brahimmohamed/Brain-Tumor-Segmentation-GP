export interface ILogin {
    email: string;
    password: string;
}

export interface IUserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IResetPassword {
    token: string;
    password: string;
    confirmPassword: string;
}
