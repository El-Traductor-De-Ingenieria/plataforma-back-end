import { User } from './typeorm/entities/User';

export type UserDetails = {
  discordId: string;
};

export type Done = (error: Error, user: User) => void;
