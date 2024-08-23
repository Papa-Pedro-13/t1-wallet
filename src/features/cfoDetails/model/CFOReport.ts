export interface Transaction {
  date: string;
  amount: number;
  senderCFOId: string;
  senderCFOName: string;
  receiverCFOId: string;
  receiverCFOName: string;
  comment: string;
}

export interface CFOReport {
  cfoName: string;
  balance: number;
  balanceDate: string;
  transactions: Transaction[];
}
