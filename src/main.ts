import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagConfig = new DocumentBuilder()
    .setTitle('Nest API test')
    .setDescription('Testing citation manager routing.')
    .setVersion('0.1')
    .build();

  const swagDocument = SwaggerModule.createDocument(app, swagConfig);

  SwaggerModule.setup('/swag', app, swagDocument);

  await app.listen(3000);
}
bootstrap();
