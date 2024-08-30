export interface TransferFromCFO {
  userId: number;
  amount: number;
  senderType: 'USER' | 'CENTER';
  comment: string;
}
export interface TransferToUser {
  amount: number;
  comment: string;
}
export interface TransferUserToUser {
  userId: number;
  amount: number;
  comment: string;
}
