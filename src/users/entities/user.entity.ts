import {Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository } from "typeorm";

@Entity('Users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}