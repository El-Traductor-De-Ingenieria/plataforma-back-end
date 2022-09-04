import { User } from './typeorm/entities/User';

export type UserDetails = {
  discordId: string;
  username: string;
};

export type DoneSerialize = (error: Error, id: number) => void;
export type DoneDeserialize = (error: Error, user: User) => void;

export enum DbFileType {
  LINK = 'link',
  TEXT = 'text',
  FILE = 'file',
}

export enum RoleType {
  MOD = 'mod',
  ADMIN = 'admin',
}
