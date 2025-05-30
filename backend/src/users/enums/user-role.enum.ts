import { ObjectValues } from '~/core/types/object-values.type';

export const UserRole = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;
export type UserRole = ObjectValues<typeof UserRole>;
