import { User } from '../../utils/typeorm/entities/User';
import { UserDetails } from '../../utils/types';

export interface IAuthService {
    validateUser(datils: UserDetails): Promise<User>;
}
