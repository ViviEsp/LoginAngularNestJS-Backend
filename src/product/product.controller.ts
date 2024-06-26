import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    async getAll(){
        return await this.productService.getAll();
    }   

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.productService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:ProductDto){
        return await this.productService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto){
        return await this.productService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.productService.delete(id);
    }
}
