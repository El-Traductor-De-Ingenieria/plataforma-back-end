import { Module } from '@nestjs/common';
import { SERVICES } from '@utils/constants';
import { UserModule } from '@user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        DiscordStrategy,
        SessionSerializer,
        {
            provide: SERVICES.AUTH,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}
