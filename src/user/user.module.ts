import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@utils/typeorm/entities/User';
import { SERVICES } from '@utils/constants';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        {
            provide: SERVICES.USER,
            useClass: UserService,
        },
    ],
    exports: [
        {
            provide: SERVICES.USER,
            useClass: UserService,
        },
    ],
    controllers: [UserController],
})
export class UserModule {}
