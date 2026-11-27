import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
// Now NestJS can use class-validator to check the actual incoming request.

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'author should not be empty' })
  @MaxLength(40)
  author!: string;

  @IsString()
  @IsNotEmpty({ message: 'body should not be empty' })
  @MaxLength(2000)
  body!: string;
}