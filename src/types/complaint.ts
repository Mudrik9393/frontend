export type ComplaintRequest = {
    name: string;
    street: string
}

export type ComplaintResponse = {
    id: string
    name: string
    street: string
    date: Date
}