import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository : ProductRepository
    ){ }

    async getAll(): Promise<ProductEntity[]>{
        const list = await this.productRepository.find();
        if(!list.length){
            throw new NotFoundException(new MessageDto('la lista esta vacia'));
        }
        return list;
    }

    async findById(id:number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({ where: { id } });
        if(!product){
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return product;
    }

    async findByName(name:string): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({ where: { name: name } });
        return product;
    }

    async create(dto : ProductDto): Promise<any>{
        const exists = await this.findByName(dto.name);
        if(exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const product = this.productRepository.create(dto);   
        await this.productRepository.save(product);
        return new MessageDto(`producto ${product.name} creado`);
    }

    async update(id:number, dto : ProductDto): Promise<any>{
        const product = await this.findById(id); 
        if(!product) throw new NotFoundException(new MessageDto('no existe'));

        const exists = await this.findByName(dto.name);
        if(exists && exists.id!==id) throw new BadRequestException(new MessageDto('ese nombre ya existe'));

        dto.name? product.name = dto.name : product.name = product.name;
        dto.price? product.price = dto.price: product.price = product.price;
        dto.description? product.description = dto.description : product.description = product.description;
        await this.productRepository.save(product);
        return new MessageDto(`producto ${product.name} actualizado`);
    }

    async delete(id:number): Promise<any>{
        const product = await this.findById(id);
        await this.productRepository.delete(product);
        return new MessageDto(`producto ${product.name} eliminado`);
    }
}
