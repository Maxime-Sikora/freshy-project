import { UserRoles } from 'src/user/interface/userRoles';

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRoles;
}
