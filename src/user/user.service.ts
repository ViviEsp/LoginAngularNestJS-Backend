import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { MessageDto } from 'src/common/message.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LocationEntity } from 'src/location/location.entity';
import { LocationRepository } from 'src/location/location.repository';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { LocationName } from 'src/location/location.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: LocationRepository,
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository
    ) {}

    async getAll(): Promise<UserEntity[]>{
        const users = await this.userRepository.find();
        if(!users.length) throw new NotFoundException(new MessageDto('No hay usuarios en la lista'));
        return users;
    }

    async create(dto: CreateUserDto): Promise<any>{
        const {userName} = dto;
        const exists = await this.userRepository.findOne({where: { userName: userName }});
        if(exists) throw new BadRequestException(new MessageDto('Ese usuario ya existe'));
        const locationUser = await this.locationRepository.findOne({where: {locationName: LocationName.COCHABAMBA}});
        if(!locationUser) throw new InternalServerErrorException(new MessageDto('Las ciudades aún no han sido creadas'));
        const user = this.userRepository.create(dto);   
        user.locations = [locationUser];
        await this.userRepository.save(user);
        return user;
    }

    async userHasAccessToCity(userName: string, locationName: LocationName): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { userName }, relations: ['locations'] });
        if (!user) {
            return false;
        }
        return user.locations.some(location => locationName === locationName);
    }

    async login(dto: LoginUserDto): Promise<any>{
        const {userName, locationName} = dto;
        const userExists = await this.userRepository.findOne({where: { userName: userName }});
        if(!userExists) throw new BadRequestException(new MessageDto('El usuario no existe'));
        const location = await this.locationRepository.findOne({ where: { locationName:  locationName} });
        if (!location) {
            throw new BadRequestException(new MessageDto('No existe esta ciudad'));
        }else if(!userExists.locations.some(userLocation => userLocation.id === location.id)){
            throw new BadRequestException(new MessageDto('El usuario no es de esta ciudad'));
        }
        const passwordOk = await compare(dto.password, userExists.password);
        if(!passwordOk) throw new UnauthorizedException(new MessageDto('Contraseña incorrecta'));
        return new MessageDto('Ingreso exitoso');
    }
}
