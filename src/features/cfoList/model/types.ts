import { User } from '../../user/model/types/user';

export interface CFO {
  id: number;
  title: string;
  budget: number;
  budgetOwner: User;
}
