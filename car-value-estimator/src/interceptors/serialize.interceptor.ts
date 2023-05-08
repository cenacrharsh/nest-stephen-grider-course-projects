import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

//> to replace type any, this means any class would be excepted and nothing else
interface ClassConstructor {
    new (...args: any[]): {};
}

//> we'll use this as a custom decorator
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

//> implements is not same as extends, we use implements whenever we want to create a new class that satisfies all the requirements of either an abstract class or interface, NestInterceptor is an interface
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(
        context: ExecutionContext,
        handler: CallHandler,
    ): Observable<any> {
        //* whatever we put here runs before a request is handled by the request handler
        console.log('I am running before the req handler');
        // console.log('I am running before the req handler', context);

        return handler.handle().pipe(
            map((data: any) => {
                //* whatever we put here runs before the response is sent out
                console.log('I am running before response is sent out', data);
                // console.log('I am running before response is sent out', data);

                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });

                //* convert incoming user entity (data) & turn it into instance of userDto
                //> this is not very flexible as it's hardcoded to always use UserDto while serializing outgoing information
                //! plainToClass deprecated, now use plainToInstance
                /*
                return plainToClass(UserDto, data, {
                    //* ensures while converting instance of userDto to plain JSON, share only those properties that are exclusively marked as expose
                    excludeExtraneousValues: true,
                });
                */
            }),
        );
    }
}
