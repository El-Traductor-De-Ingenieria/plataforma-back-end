import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbFile } from '@utils/typeorm/entities/DbFile';
import { Repository } from 'typeorm';
import { IRepositoryService } from '../interfaces/repository';
import { User } from '@utils/typeorm/entities/User';
import { DbFileType } from '@utils/types';

import { readFileSync, unlinkSync } from 'fs';
import { createHash } from 'crypto';

@Injectable()
export class RepositoryService implements IRepositoryService {
    constructor(
        @InjectRepository(DbFile)
        private readonly dbFileRepository: Repository<DbFile>
    ) {}

    getFile(id: number): Promise<DbFile> {
        return this.dbFileRepository.findOneBy({ id: id });
    }

    getFileByHash(hash: string): Promise<DbFile> {
        return this.dbFileRepository.findOneBy({ fileHash: hash });
    }

    async newFileTypeTextOrUrl(
        textOrUrl: string,
        isUrl: boolean,
        name: string,
        user: User
    ) {
        if (textOrUrl.length <= 1024 || isUrl) {
            const hash = createHash('sha256');
            hash.update(textOrUrl);
            const digest = hash.digest('hex');

            const fileFound = await this.dbFileRepository.findOneBy({
                fileHash: digest,
            });

            if (fileFound != null) {
                return fileFound;
            }

            const file = this.dbFileRepository.create({
                type: isUrl ? DbFileType.LINK : DbFileType.TEXT,
                textOrUrl: textOrUrl,
                fileName: name,
                fileHash: digest,
                uploaderId: user.id,
            });

            return this.dbFileRepository.save(file);
        }

        throw new Error('Should be uploaded as file due to size');
    }

    async newFileTypeFile(filePath: string, fileName: string, user: User) {
        const fileBuffer = readFileSync(filePath);
        const hash = createHash('sha256');
        hash.update(fileBuffer);

        const digest = hash.digest('hex');

        const fileFound = await this.dbFileRepository.findOneBy({
            fileHash: digest,
        });

        if (fileFound != null) {
            unlinkSync(filePath); //Remove the new uploaded file
            return fileFound;
        }

        const file = this.dbFileRepository.create({
            type: DbFileType.FILE,
            filePath: filePath,
            fileName: fileName,
            fileHash: digest,
            uploaderId: user.id,
        });

        return this.dbFileRepository.save(file);
    }

    search(data: string, page = 0) {
        return this.dbFileRepository
            .createQueryBuilder()
            .select()
            .where(`approved=1`)
            .orWhere(`MATCH(fileName) AGAINST ('${data}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(textOrUrl) AGAINST ('${data}' IN BOOLEAN MODE)`)
            .orderBy('reputationPoints', 'DESC')
            .skip(page * 10)
            .take(20)
            .getMany();
    }
}
