import { hash } from "bcryptjs";
import { LocationEntity } from "src/location/location.entity";
import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from "typeorm";


@Entity({name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    userName: string;

    @Column({type: 'varchar', nullable: false})
    password : string;

    @ManyToMany(type => LocationEntity, location => location.users, {eager: true})
    @JoinTable({
        name: 'user_location',
        joinColumn: {name: 'user_id'},
        inverseJoinColumn: {name: 'location_id'}
    })
    locations: LocationEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }
}