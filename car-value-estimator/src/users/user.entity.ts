import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    //> whenever we insert a new user into our DB, this function will be called
    @AfterInsert()
    logInsert() {
        //* this is a reference to the entity we just inserted
        console.log('Inserted User with Id:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with Id:', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with Id:', this.id);
    }
}

/*
    typeOrm allows us to define functions on entities, they will be called automatically at certain points of time
*/
