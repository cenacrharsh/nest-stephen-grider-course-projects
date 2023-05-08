import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersServie: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session;

        if (userId) {
            const user = await this.usersServie.findOne(userId);

            //! we'll add this user to the req object, as we can access the req object inside our decorator
            request.currentUser = user;
        }

        return handler.handle(); //* run the actual route handler
    }
}
