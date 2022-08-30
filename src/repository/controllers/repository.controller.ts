import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm/entities/User';
import { AutheticatedGuard } from '../../auth/utils/Guards';
import { ROUTES, SERVICES } from '../../utils/constants';
import { IRepositoryService } from '../interfaces/repository';

@Controller(ROUTES.REPOSITORY)
export class RepositoryController {
  constructor(
    @Inject(SERVICES.REPO)
    private readonly repositoryService: IRepositoryService,
  ) {}

  @Get('file/:id')
  getFile(@Param('id') id: number) {
    return `This will return the file id ${id}`;
  }

  @Post('upload')
  @UseGuards(AutheticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @AuthUser() user: User,
  ) {
    console.log('Uploading file');
    console.log(`Username: ${user.username}`);
    console.log(`Saved on ${file.path}`);

    const fileDb = await this.repositoryService.newFileTypeFile(
      file.path,
      file.originalname,
      user,
    );

    console.log(fileDb.filePath);
    console.log(fileDb.id);
    console.log(fileDb.uploaderId);
    console.log(fileDb.uploadDate);

    return fileDb;
  }
}
