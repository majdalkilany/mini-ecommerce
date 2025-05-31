import { ObjectValues } from '~/core/types';

export const UserRole = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = ObjectValues<typeof UserRole>;
