import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { Connection, getRepository } from 'typeorm';
import { Session } from './utils/typeorm/entities/Session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(Connection).getRepository(Session);

  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 12, // Half day the cookie will be valid
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  // Se puede activar esto pero depende de la implementación del frontend
  /*app.enableCors({
    origin: ['http://localhost:80'],
    credentials: true,
  });*/
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(process.env.PORT);
    console.log(`Running REST API on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
