import { User } from './typeorm/entities/User';

export type UserDetails = {
  discordId: string;
  username: string;
};

export type Done = (error: Error, user: User) => void;

export enum DbFileType {
  LINK = 'link',
  TEXT = 'text',
  FILE = 'file',
}
