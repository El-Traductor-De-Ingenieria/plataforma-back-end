import { PassportSerializer } from '@nestjs/passport';
import { Done } from '../../utils/types';
import { User } from '../../utils/typeorm/entities/User';
import { Inject } from '@nestjs/common';
import { SERVICES } from '../../utils/constants';
import { IUserService } from '../../user/interfaces/user';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    try {
      const userDatabase = await this.userService.findUserByUsername(
        user.username,
      ); //In the cookie we search by username
      return userDatabase ? done(null, userDatabase) : done(null, null);
    } catch (error) {
      done(error, null);
    }
  }
}
