import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './location.entity';
import { LocationRepository } from './location.repository';
import { MessageDto } from 'src/common/message.dto';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {

    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: LocationRepository
    ) {}

    async getAll(): Promise<LocationEntity[]>{
        const locations = await this.locationRepository.find();
        if(!locations.length) throw new NotFoundException(new MessageDto('no hay ciudades en la lista'));
        return locations;
    }

    async create(dto: CreateLocationDto): Promise<any>{
        const exists = await this.locationRepository.findOne({where: {locationName: dto.locationName}});
        if(exists) throw new BadRequestException(new MessageDto('esa ciudad ya existe'));
        await this.locationRepository.save(dto as LocationEntity);
        return new MessageDto('ciudad  creada');
    }
}
