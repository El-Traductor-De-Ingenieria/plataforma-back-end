import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../utils/typeorm/entities/User';
import { Repository } from 'typeorm';
import { IUserService } from '../interfaces/user';
import { UserDetails } from '../../utils/types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(details: UserDetails) {
    console.log('Create User');
    let userDatabase = await this.findUserByUsername(details.username);
    let id = 1;
    while (userDatabase != null) {
      console.log(userDatabase);
      details.username = details.username + id;
      userDatabase = await this.findUserByUsername(details.username);
      id++;
    }
    const user = this.userRepository.create({
      discordId: details.discordId,
      username: details.username,
    });

    return this.userRepository.save(user);
  }

  findUserByUsername(username: string) {
    console.log('Find User');
    return this.userRepository.findOne({ where: [{ username: username }] });
  }

  findUserById(id: number) {
    console.log('Find User');
    return this.userRepository.findOne({ where: [{ id: id }] });
  }

  findUserByDiscordId(discordId: string) {
    console.log('Find User');
    return this.userRepository.findOne({ where: [{ discordId: discordId }] });
  }
}
