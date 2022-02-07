import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { CreateUserDto, CreateLoginDto } from "../dtos/user.dto";
import { User } from "../interfaces/models/User.interface";
import DB from "../db";
import { isEmpty } from "../utils/util";

class AuthService {
  public users = DB.User;

  public async signUp(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No data received");

    const findUser: User = await this.users.findOne({
      where: { email_address: userData.email_address },
    });
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email_address} already exists`
      );

    const hashedPassword = await bcrypt.hash(userData.password_user, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password_user: hashedPassword,
    });

    return createUserData;
  }

  public async login(
    userData: CreateLoginDto
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "No data received");

    const findUser: User = await this.users.findOne({
      where: { email_address: userData.email_address },
    });
    if (!findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email_address} not found`
      );
    let isPasswordMatching: boolean;

    isPasswordMatching = await bcrypt.compare(
      userData.password_user,
      findUser.password_user
    );
    
    console.log(userData.password_user)
    console.log(findUser.password_user)

    if (!isPasswordMatching)
      throw new HttpException(409, `Your password not matching`);

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async self(token: string): Promise<User> {
    if (isEmpty(token)) throw new HttpException(400, "No token provided");


    const secret: string = process.env.JWT_SECRET;
    const decoded: any = jwt.verify(token, secret);
    const id: string = decoded.id;

    if (!id) throw new HttpException(400, "Token not valid");

    const findUser: User = await this.users.findOne({ where: { user_id: id } });

    return findUser;
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No data received");

    const findUser: User = await this.users.findOne({
      where: { password_user: userData.password_user },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.user_id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 24 * 30;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
