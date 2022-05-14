export interface User {
    username: string,
    email: string,
    birthdate?: Date,
    gender?: string,
    education?: string,
    premium?: boolean,
    admin?: boolean
}