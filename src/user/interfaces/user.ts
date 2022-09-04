import { User } from '../../utils/typeorm/entities/User';
import { UserDetails } from '../../utils/types';

export interface IUserService {
  createUser(details: UserDetails): Promise<User>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  findUserByDiscordId(discordId: string): Promise<User | null>;

  saveUser(user: User): Promise<User | null>;
}
