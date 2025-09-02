import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;    // 👈 note the !

  @IsString()
  @IsNotEmpty()
  content!: string;  // 👈 note the !

  @IsString()
  @IsNotEmpty()
  author!: string;   // 👈 note the !
}
