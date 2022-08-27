import { User } from '../../utils/typeorm/entities/User';
import { UserDetails } from '../../utils/types';

export interface IUserService {
  createUser(details: UserDetails): Promise<User>;
  findUser(username: string): Promise<User | null>;
  findUserByDiscordId(discordId: string): Promise<User | null>;
}
