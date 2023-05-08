import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

//! scrypt is async but instead of returning a promise it works with callbacks, so we use another helper func present in node promisify that takes in a func that makes use of callbacks and returns a version of it that uses promises

const scrypt = promisify(_scrypt);

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        //> see if the email provided is already in use, if it is return an error
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email is already in use');
        }

        //> encrypt/hash the user's password
        //* generate a salt, randomBytes returns a buffer of 1 and 0 of 8 size bytes, so we convert them into a hexadecimal string, 1 byte of data gives 2 char, so our salt is 16 char long
        const salt = randomBytes(8).toString('hex');

        //* hash the salt and the password together
        //! ts has no idea about type of hash so we add as Buffer as scrypt returns buffer
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //* join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        //> create a new user & save it
        const user = await this.usersService.create(email, result);

        //> return the user
        return user;
    }

    async signin(email: string, password: string) {
        //> find user with the given email in DB
        //* using destructuring to only get first user
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        //> extract salt & hash from db
        const [salt, storedHash] = user.password.split('.');

        //> hash the salt + password and compare with storedHash
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('wrong password');
        }
        return user;
    }
}
