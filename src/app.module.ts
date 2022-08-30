import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { RepositoryModule } from './repository/repository.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      synchronize: true, //TODO: Esto tiene que estar en false cuando el proyecto se lance
      entities: entities,
      ssl: process.env.SSL_CERT,
      extra: {
        ssl: {
          ca: process.env.SSL_CERT,
          rejectUnauthorized: false,
        },
      },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UserModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
