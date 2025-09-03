// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend
  app.enableCors({
    origin: '*', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  await app.listen(3002); // make sure this port matches your API URL
}
bootstrap();
