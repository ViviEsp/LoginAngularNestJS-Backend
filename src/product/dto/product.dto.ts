import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductDto {
    @IsNotBlank({message : 'nombre invalido'})
    name?: string;

    @IsNumber()
    @IsNotEmpty()
    price?: number;

    @IsString()
    @IsNotEmpty()
    description?: string;
}