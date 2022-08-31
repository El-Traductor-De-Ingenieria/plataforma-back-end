import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
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
import { DbFileType } from '../../utils/types';
import { Response } from 'express';
import { randomBytes } from 'crypto';
import { existsSync, writeFileSync } from 'fs';

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

  @Post('uploadFile')
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

  @Post('upload')
  @UseGuards(AutheticatedGuard)
  async upload(
    @Body() body,
    @Res({ passthrough: true }) res: Response,
    @AuthUser() user: User,
  ) {
    console.log('Uploading file data');

    if (
      !body.type ||
      body.type == DbFileType.FILE ||
      !body.name ||
      !body.name.length
    ) {
      res.status(HttpStatus.BAD_REQUEST);
      return [];
    }

    let fileDb = null;
    if (body.data.length > 1024) {
      console.log('Creating file');

      let tempName = 'uploads/' + randomBytes(16).toString('hex');
      let i = 500;
      while (existsSync(tempName) && i != 0) {
        tempName = 'uploads/' + randomBytes(16).toString('hex');
        i--;
      }

      if (i == 0) {
        res.status(HttpStatus.REQUEST_TIMEOUT);
        return [];
      }

      writeFileSync(tempName, body.data);

      fileDb = await this.repositoryService.newFileTypeFile(
        tempName,
        body.name,
        user,
      );
    } else {
      fileDb = await this.repositoryService.newFileTypeTextOrUrl(
        body.data,
        body.type == DbFileType.LINK,
        body.name,
        user,
      );
    }

    console.log(fileDb.filePath);
    console.log(fileDb.id);
    console.log(fileDb.uploaderId);
    console.log(fileDb.uploadDate);

    return fileDb;
  }
}
