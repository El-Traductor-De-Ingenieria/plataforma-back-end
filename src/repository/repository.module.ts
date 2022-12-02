import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SERVICES } from '@utils/constants';
import { DbFile } from '@utils/typeorm/entities/DbFile';
import { RepositoryController } from './controllers/repository.controller';
import { RepositoryService } from './services/repository.service';

@Module({
    controllers: [RepositoryController],
    imports: [TypeOrmModule.forFeature([DbFile])],
    providers: [
        {
            provide: SERVICES.REPO,
            useClass: RepositoryService,
        },
    ],
    exports: [
        {
            provide: SERVICES.REPO,
            useClass: RepositoryService,
        },
    ],
})
export class RepositoryModule {}
