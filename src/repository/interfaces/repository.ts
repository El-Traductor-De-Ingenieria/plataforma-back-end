import { User } from '../../utils/typeorm/entities/User';
import { DbFile } from '../../utils/typeorm/entities/DbFile';

export interface IRepositoryService {
    getFile(id: number): Promise<DbFile | null>;
    getFileByHash(hash: string): Promise<DbFile | null>;
    newFileTypeTextOrUrl(
        textOrUrl: string,
        isUrl: boolean,
        name: string,
        user: User
    ): Promise<DbFile | null>;
    newFileTypeFile(
        filePath: string,
        fileName: string,
        user: User
    ): Promise<DbFile | null>;
    search(data: string, page: number): Promise<DbFile[] | null>;
}
