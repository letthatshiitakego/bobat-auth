import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.TITLE_APP ?? 'Sample app')
    .setDescription(process.env.DESC_APP ?? 'The cats API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
