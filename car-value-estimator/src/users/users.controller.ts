import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException,
} from '@nestjs/common';

import { Serialize } from './interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        this.usersService.create(body.email, body.password);
    }

    //* id's are numbers, but everything in incoming req comes as a string
    //! @UseInterceptors(new SerializeInterceptor(UserDto)), replaced with custom decorator
    //! @Serialize(UserDto), placed at controller level
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('findUser controller is running');
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
