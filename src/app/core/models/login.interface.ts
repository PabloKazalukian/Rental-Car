import { User } from "./user.interface"

export interface Login {
    email: string,
    password: string
}
export interface LoginResponde {
    accessToken: string,
    user: User
}
