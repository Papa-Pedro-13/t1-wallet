export enum UserRole {
  admin = 'ADMIN',
  user = 'USER',
  budgetOwner = 'BUDGET_OWNER',
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  surname: string;
  userRole: UserRole;
  coins: number;
}
