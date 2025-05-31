import { UserRole } from '~/users/enums';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
