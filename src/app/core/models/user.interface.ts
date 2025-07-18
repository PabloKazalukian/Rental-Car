export interface userRegister {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface LoginResponde {
    message: string,
    token: string

}
export interface Usuario {
    username: string,
    sub: string,
    role: string
}

export interface User {
    username: string,
    password: string,
    email: string,
    role: string
}

export interface credentialsUser {
    remember: boolean,
    username: string,
    password: string
}
