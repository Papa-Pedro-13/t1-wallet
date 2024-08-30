import { CFO } from '../../cfoList/model/types';
import { UserRole } from '../../user/model/types/user';

export interface Transaction {
  id: number;
  nameOfOperation: string;
  comment: string;
  dateTime: string;
  amount: number;
  from: string;
  to: string;
  recipient: number;
  senderType: UserRole;
}

export interface CFOReport extends Transaction {
  center: CFO;
}

export interface TransactionResponse {
  data: Transaction[];
  total: number;
}

export interface TransactionQueryProps {
  id: number;
  userId?: number;
  dateStart?: string;
  dateEnd?: string;
  page?: number;
  pageSize?: number;
}
