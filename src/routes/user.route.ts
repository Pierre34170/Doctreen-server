import { Router } from "express";
import UserController from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/user.dto";
import Route from "../interfaces/route.interface";
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class RecipeRoute implements Route {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.userController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.userController.getUserById);
    this.router.get(`${this.path}/search`, this.userController.getUserByName);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateUserDto, 'body', true), this.userController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.userController.deleteUser);
  }
}

export default RecipeRoute;
