import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // port number by default - can be changed to any number user want to app to listen.
}
bootstrap();


// npm start directly transcript ts files . if we want to do it explicitly we can do that by cmd - npm run build.
// Otherwise it is taken care of implicitly.

//check working condition of project by using cmd - npm run build -> nest build in terminal then all working fine