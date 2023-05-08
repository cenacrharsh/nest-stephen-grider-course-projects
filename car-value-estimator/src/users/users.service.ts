import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

//# In general Services should not throw exceptions if we are using other communication protocols as well apart from http, as http specific exceptions make no sense for controllers handling other communication protocols like WebSocket, so such a service would be of no use to those controllers

@Injectable()
export class UsersService {
    //* Type Annotation: Repository<User> with generic type User
    //* repo is going to be an instance of a typeOrm repository, that deals with instances of Users
    //> @InjectRepository - tells DI system that we need the User repository, required because we are using a generic type of User
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        //* create function doesn't persist/save any info in the DB, it takes in the info, creates a new instance of the user entity and supplies the data we supplied to that entity, then we pass that entity to the save method which takes an entity and saves in the DB
        //> create: create an instance of an entity
        //> save: actually saves the info in the DB, but it can do so with an object with the properties a user should have as well
        /*
            then why do need an entity ?

            inside of user entity file, we define all properties user entity should have, we usually don't put any business logic there but in some scenarios we might put some validation logic here directly instead of the dto, in that case before saving data in to db we need to validate our data which will only be done when we create instance of our entity, same goes for hooks, without entities hooks won't run
        */
        const user = this.repo.create({
            email,
            password,
        });

        return this.repo.save(user);
    }

    //! return one record or null
    findOne(id: number) {
        //* to handle signout functionality
        if (!id) {
            return null;
        }
        return this.repo.findOne({
            where: {
                id: id,
            },
        });
    }

    //! return an array of results or []
    find(email: string) {
        return this.repo.find({
            where: {
                email: email,
            },
        });
    }

    //* we can't pass all attributes related to user one by one, very difficult if we want to update only a few and not all
    //> Partial is a type helper defined in ts, tells us that attrs variable can hold any object containing some/none of the properties of the User class, it will throw an error if we pass extra properties that don't belong to User
    async update(id: number, attrs: Partial<User>) {
        //* to use save, we first fetch an entity then use save on updated object
        const user = await this.repo.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('user not found');
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('user not found');
        }

        return this.repo.remove(user);
    }
}

/*
    ! save() &  remove() are expected to be called with entitiy instances, in this case hooks would run
    ! insert(), update() & delete() made to work with plain object, so they are called directly due to which hooks won't work
*/
