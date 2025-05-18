export type UserRequest = {
    userName: string;
    zanId: string
    email: string
    password: string
}

export type UserResponse = {
    userId: number
    userName: string
    zanId: string
    email: string
    password: string
}