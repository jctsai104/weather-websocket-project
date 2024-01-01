import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  app.enableCors();
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
