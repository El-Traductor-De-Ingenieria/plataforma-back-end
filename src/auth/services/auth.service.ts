import { Inject, Injectable } from '@nestjs/common';
import { UserDetails } from '@utils/types';
import { IUserService } from '@user/interfaces/user';
import { SERVICES } from '@utils/constants';
import { IAuthService } from '../interfaces/auth';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(SERVICES.USER) private readonly userService: IUserService
    ) {}

    async validateUser(details: UserDetails) {
        const user = await this.userService.findUserByDiscordId(
            details.discordId
        ); //On the oath validator we use the discord id, because an username could have a username but doesn't have a discord linked
        return user || this.userService.createUser(details);
    }
}
