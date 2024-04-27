import { IsNotEmpty, IsString } from "class-validator";

export class CreateSectionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    locationId: string;
}
