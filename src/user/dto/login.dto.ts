import { IsEnum, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { LocationName } from "src/location/location.enum";

export class LoginUserDto{
    @IsNotBlank({message : 'El nombre de usuario no puede estar vacio'})
    @MaxLength(10, {message : 'El nombre de usuario es muy largo'})
    userName: string;

    @IsNotBlank({message : 'La contraseña no puede estar vacia'})
    password: string;

    @IsEnum(LocationName, {message: 'La ciudad solo puede ser Cochabamba, La paz o Santa Cruz'})
    locationName: LocationName;
}