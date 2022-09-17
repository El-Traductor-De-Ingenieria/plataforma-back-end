import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { Connection, getRepository } from 'typeorm';
import { Session } from './utils/typeorm/entities/Session';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { domainToASCII } from 'url';
import { writeFile, writeFileSync } from 'fs';
import { exit } from 'process';

async function bootstrap(create_docs: boolean) {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(Connection).getRepository(Session);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Plataforma Backend API')
    .setDescription(
      `Esta API REST se encarga de dar comunicación al FrontEnd, con las bases de datos y los servicios
        integrados dentro del servidor.`,
    )
    .setVersion('v1')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (create_docs) {
    writeFileSync('api.json', JSON.stringify(document));

    exit(0);
  }

  SwaggerModule.setup('docs', app, document);

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
  app.enableCors({
    origin: [/^http:\/\/localhost:/, /^http:\/\/localhost/],
    credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(process.env.PORT);
    console.log(`Running REST API on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap(process.argv.length >= 3 && process.argv[2] == '--docs');
