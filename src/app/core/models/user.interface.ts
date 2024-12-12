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
export interface usuario {
    username: string,
    userId?: number
}

export interface User {
    username: string,
    password: string,
    email: string,
    role: string
}