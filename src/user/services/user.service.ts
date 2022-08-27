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

  createUser(details: UserDetails) {
    console.log('Create User');
    const user = this.userRepository.create({
      discordId: details.discordId,
    });

    return this.userRepository.save(user);
  }

  findUser(discordId: string) {
    console.log('Find User');
    return this.userRepository.findOne({ where: [{ discordId: discordId }] });
  }
}
