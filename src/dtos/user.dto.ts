import { IsString, IsEmail, Length, MaxLength, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public last_name: string;
  
  @IsString()
  public first_name: string;

  @IsEmail()
  public email_address: string;

  @IsString()
  public password_user: string;

  @MaxLength(280)
  @IsString()
  public description: string;

  @IsNumber()
  public nb_like: number;

  @IsNumber()
  public signal: number;

  @IsString()
  public role: string;

}

export class CreateSignupDto {
  @Length(1, 20)
  @IsString()
  public last_name: string;

  @Length(1, 20)
  @IsString()
  public first_name: string;

  @IsEmail()
  public email_address: string;

  @IsString()
  public password_user: string;
}

export class CreateLoginDto {
  @IsEmail()
  public email_address: string;

  @IsString()
  public password_user: string;
}
