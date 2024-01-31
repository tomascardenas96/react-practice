import { IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}
