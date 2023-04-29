import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  name: string;
}