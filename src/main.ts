import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;
  const environment = configService.get<string>('NODE_ENV') || 'development';
  app.enableCors({
    methods: ['GET,POST,PUT,PATCH,DELETE'],
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(port);
  logger.log(
    `Server is listening on PORT - ${port}, Environment - ${environment}`,
  );
}
bootstrap();
