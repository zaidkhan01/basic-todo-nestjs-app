import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import {DocumentBuilder,SwaggerModule} from "@nestjs/swagger"
import { JwtAuthGuard } from './auth/guard/jwt.guard';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { 
    fallbackOnErrors: true 
   });
   app.useGlobalGuards(new JwtAuthGuard())
   const options= new DocumentBuilder()
   .setTitle("TodoApp")
   .setDescription("Todo NestApp Rest Api Docs")
   .setVersion("1.0")
  await app.listen(3000);
}
bootstrap();
