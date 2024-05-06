import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { LocationName } from "../location.enum";
import { IsEnum } from "class-validator";

export class CreateLocationDto{

    @IsEnum(LocationName, {message: 'La ciudad solo puede ser Cochabamba, La paz o Santa Cruz'})
    //@IsNotBlank({message : 'nombre invalido'})
    locationName?: LocationName;
}