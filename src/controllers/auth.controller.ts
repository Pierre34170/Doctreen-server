import { NextFunction, Request, Response } from 'express';
import cookie from 'cookie';
import { CreateUserDto, CreateLoginDto } from '../dtos/user.dto';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { User } from '../interfaces/models/User.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();
  public userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = {
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      email_address: req.body.email_address,
      password_user: req.body.password_user,
      description: '',
      nb_like: 0,
      signal: 0,
      role: 'USER'
    };

    try {
      const signUpUserData: User = await this.authService.signUp(userData);
      res.status(201).json({
        data: signUpUserData,
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateLoginDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({
        data: findUser,
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public self = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const User = await this.authService.self(cookie.parse(req.header('cookie'))['Authorization']);
      res.status(200).json({
        data: User,
        message: 'self user',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userData: User = req.user;

    try {
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({
        data: logOutUserData,
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
