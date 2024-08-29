import { CFO } from '../../cfoList/model/types';
import { UserRole } from '../../user/model/types/user';

export interface Transaction {
  id: number;
  nameOfOperation: string;
  comment: string;
  dateTime: Date;
  amount: number;
  from: string;
  to: string;
  recipientType: UserRole;
}

export interface CFOReport extends Transaction {
  center: CFO;
}

export interface TransactionQueryProps {
  id: number;
  userId?: number;
  dateStart?: string;
  dateEnd?: string;
  page?: number;
  pageSize?: number;
}
