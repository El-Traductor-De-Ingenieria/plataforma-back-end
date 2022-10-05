import { PassportSerializer } from '@nestjs/passport';
import { DoneSerialize, DoneDeserialize } from '../../utils/types';
import { User } from '../../utils/typeorm/entities/User';
import { Inject } from '@nestjs/common';
import { SERVICES } from '../../utils/constants';
import { IUserService } from '../../user/interfaces/user';

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(SERVICES.USER) private readonly userService: IUserService
    ) {
        super();
    }

    serializeUser(user: User, done: DoneSerialize) {
        done(null, user.id);
    }

    async deserializeUser(id: number, done: DoneDeserialize) {
        try {
            const userDatabase = await this.userService.findUserById(id);
            return userDatabase ? done(null, userDatabase) : done(null, null);
        } catch (error) {
            done(error, null);
        }
    }
}
