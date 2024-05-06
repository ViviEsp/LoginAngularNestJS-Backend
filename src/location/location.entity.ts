
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocationName } from "./location.enum";

@Entity({name: 'location'})
export class LocationEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    locationName: LocationName;

    @ManyToMany(type => UserEntity, user => user.locations) 
    users: UserEntity[];
}