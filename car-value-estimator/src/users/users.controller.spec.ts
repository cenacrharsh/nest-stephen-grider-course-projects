import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

//# We can't test decorators in unit test, we need end to end tests for that

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'email@email.com',
                    password: 'password',
                } as User);
            },
            find: (email: string) => {
                return Promise.resolve([
                    {
                        id: 1,
                        email,
                        password: 'password',
                    } as User,
                ]);
            },
            // remove: () => {},
            // update: () => {},
        };

        fakeAuthService = {
            // signup: () => {},
            // signin: () => {},
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findAllUsers returns a list of users with the given email', async () => {
        const users = await controller.findAllUsers('test@test.com');
        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual('test@test.com');
    });

    it('findUser returns a single user with the given id', async () => {
        const user = await controller.findUser('1');

        expect(user).toBeDefined();
    });

    it('findUser returns an error if user with given id is not found', async () => {
        fakeUsersService.findOne = () => null;

        await expect(controller.findUser('1')).rejects.toThrow(
            new NotFoundException('user not found'),
        );
    });
});
