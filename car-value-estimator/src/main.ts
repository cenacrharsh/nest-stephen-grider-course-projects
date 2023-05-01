import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            //* makes sure any additional properties in body of incoming request is removed
            whitelist: true,
        }),
    );

    await app.listen(3000);
}
bootstrap();
