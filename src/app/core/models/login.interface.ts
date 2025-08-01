import { User } from "./user.interface"

export interface Login {
    identifier: string,
    password: string
}

export interface LoginWithCredentials {
    identifier: string,
    password: string,
    remember: boolean
}

export interface LoginResponde {
    accessToken: string,
    user: User
}

export interface LoginResponde {
    message: string,
    token: string
}

export interface AuthenticatedUser {
    username: string,
    sub: string,
    role: string
}

