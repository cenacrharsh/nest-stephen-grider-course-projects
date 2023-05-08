import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//> ExecutionContext -> a wrapper around incoming request, can work with http, graphql, web sockets and other protocols
export const CurrentUser = createParamDecorator(
    //* data is the info we provide while using this decorator, ours doesn't need any arguments
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest(); //* will give us the underlying request that is coming to our application

        return request.currentUser;
    },
);
