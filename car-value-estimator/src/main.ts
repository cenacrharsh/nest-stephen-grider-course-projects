import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//! ts setting required by nest doesn't allow to import cookie-session due to some compatibility issues
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        cookieSession({
            keys: ['asdfasdf'], //* used to encrypt info stored in cookie
        }),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            //* makes sure any additional properties in body of incoming request is removed
            whitelist: true,
        }),
    );

    await app.listen(3000);
}
bootstrap();
