import { Iuser } from "./i-user";

export interface ILogin {
    userName: string;
    password: string;
    token: string;
    userDto: Iuser;
}
