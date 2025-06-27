export type RequestRequest = {
    id: number;
    requestName: string;
    document: string;
    date: string;
    fullName: string;
    phoneNumber: string;
    address: string
    
}

export interface RequestResponse {
  requestId: number;
  requestName: string;
  document: string;
  date: string;
  accountNumber: string;
  message: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}


