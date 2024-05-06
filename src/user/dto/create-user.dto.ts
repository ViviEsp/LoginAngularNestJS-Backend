import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateUserDto{
    @IsNotBlank({message : 'el nombre de usuario no puede estar vacio'})
    @MaxLength(10, {message : 'el nombre de usuario es muy largo'})
    userName: string;

    @IsNotBlank({message : 'la contraseña no puede estar vacia'})
    password: string;
}