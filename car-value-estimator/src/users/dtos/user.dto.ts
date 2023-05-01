import { Expose } from 'class-transformer';

export class UserDto {
    //* we list out all the properties we want to share in the response

    @Expose()
    id: number;

    @Expose()
    email: string;
}
