export interface userRegister {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type PassDouble = {
    password1: string,
    password2: string
}

export type ModifyUser = {
    username: string,
    email: string
}

export interface User {
    username: string,
    email: string,
    password?: string,
    role: string
}
