import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNumber()
  authorId: number;
}

