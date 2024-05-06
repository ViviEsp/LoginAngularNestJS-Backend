import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
export class LocationController {

    constructor(private readonly locationService: LocationService) {}

    @Get()
    getAll(){
        return this.locationService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    create(@Body() dto:CreateLocationDto){
        return this.locationService.create(dto);
    }
}
