export type BillRequest = {
  billName: string;
  description?: string;
  unit: number;
};

export type BillResponse = {
  billId: number;
  billName: string;
  description?: string;
  unit: number;
  totalAmount: number;
};
