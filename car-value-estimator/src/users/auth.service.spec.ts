import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
    let service: AuthService;

    //* Partial<UsersService> makes sure we are implementing the right way
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];

        //> create a fake copy of the users service
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email,
                );

                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password,
                } as User;
                users.push(user);

                return Promise.resolve(user);
            },
        };

        //> creating a new DI container
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        //> it cause our DI container to create a new instance of AuthService with all of it's dependencies initialized
        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('test@gmail.com', 'Pass@123');

        expect(user.password).not.toEqual('Pass@123');

        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        //* redefine find() func just for this test
        // fakeUsersService.find = () =>
        //     Promise.resolve([
        //         { id: 1, email: 'email', password: 'password' } as User,
        //     ]);

        //# New version of Jest doesn't allow async/await and done together
        //! Jest doesn't work well with async code that is supposed to throw an error
        // try {
        //     await service.signup('test@test.com', 'Pass@123');
        // } catch (err) {
        //     //* if done not called after some time jest fails the test, so to make sure it works we use try catch block
        //     done();
        // }

        //> Assert that the service throws a BadRequestException with the correct message
        await service.signup('email@email.com', 'Pass@123');
        await expect(
            service.signup('email@email.com', 'Pass@123'),
        ).rejects.toThrow(new BadRequestException('Email is already in use'));
    });

    it('throws if signin is called with an unused email', async () => {
        // try {
        //     await service.signin('email@email.com', 'password');
        // } catch (err) {
        //     done();
        // }

        await expect(
            service.signin('email@email.com', 'password'),
        ).rejects.toThrow(new NotFoundException('User not found'));
    });

    it('throws if an invalid password is provided', async () => {
        // fakeUsersService.find = () =>
        //     Promise.resolve([
        //         {
        //             id: 1,
        //             email: 'email@email.com',
        //             password: 'password',
        //         } as User,
        //     ]);

        await service.signup('test@test.com', 'password');
        await expect(
            service.signin('test@test.com', 'differentPassword'),
        ).rejects.toThrow(new BadRequestException('wrong password'));
    });

    it('returns a user if correct password is provided', async () => {
        // fakeUsersService.find = () =>
        //     Promise.resolve([
        //         {
        //             id: 1,
        //             email: 'email@email.com',
        //             password:
        //                 '091a1bc56e11d3b5.e1163a8e61c79a598dd5805285ce12ad4be6c1830a7b101237817d049e6d799d',
        //         } as User,
        //     ]); //* telling ts to treat it as user entity although hooks are missing which we don't need for testing

        await service.signup('email@email.com', 'password');

        const user = await service.signin('email@email.com', 'password');
        expect(user).toBeDefined();
    });
});
