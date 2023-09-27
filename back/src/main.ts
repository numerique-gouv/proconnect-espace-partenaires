import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors({ origin: process.env.LOCALHOST_URL }));

  await app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}
bootstrap();
