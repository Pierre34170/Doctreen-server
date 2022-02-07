import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateSignupDto, CreateLoginDto } from '../dtos/user.dto';
import Route from '../interfaces/route.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.post('/signup', validationMiddleware(CreateSignupDto, 'body'), this.authController.signUp);
    this.router.post('/login', validationMiddleware(CreateLoginDto, 'body'), this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
    this.router.get('/self', authMiddleware, this.authController.self);
  }
}

export default AuthRoute;
