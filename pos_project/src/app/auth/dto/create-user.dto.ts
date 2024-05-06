import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsNumber, IsEnum, Length, Contains } from 'class-validator';


enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: string;
}
