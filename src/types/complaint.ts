export type ComplaintRequest = {
    fullName: string;
    complaintName: string
    accountNumber: string
    street: string
    district: string
    phoneNumber: string
    
}

export type ComplaintResponse = {
    
    id: string
    fullName: string;
    complaintName: string
    accountNumber: string
    street: string
    district: string
    phoneNumber: string
    
    
}