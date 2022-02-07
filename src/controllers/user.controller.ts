import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/models/User.interface";
import UserService from "../services/user.service";

class RecipeController {
  private userService = new UserService();
  public getUsers = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users: User[] = await this.userService.findAllUsers();
      res.status(200).json({ data: users, message: "find all users." });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);

    try {
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({
        data: findOneUserData,
        message: "findOne",
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserByName = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const search: string = req.query.search ? String(req.query.search) : "";
    const userId = Number(req.params.id);

    console.log(req.user);

    try {
      const findUsers: User[] = await this.userService.findUserByName(search);
      const otherFindUsers: User[] = findUsers.filter(
        (user) => user.user_id != userId
      );
      res.status(200).json({
        data: otherFindUsers,
        message: "findAll",
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;

    try {
      const createUserData: User = await this.userService.createUser(userData);
      res.status(201).json({
        data: createUserData,
        message: "created",
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);
    const userData: User = req.user;
    const newUserData: User = req.body;

    try {
      // if (userData.user_id === userId || userData.role != "USER") {
      //   const updateUserData: User = await this.userService.updateUser(
      //     userId,
      //     newUserData
      //   );
      //   res.status(200).json({
      //     data: updateUserData,
      //     message: "updated",
      //   });
      // } else {
      //   res.status(403).json({
      //     message: `You are not allow to modify user with id ${userId}`,
      //   });
      // }
      const updateUserData: User = await this.userService.updateUser(
        userId,
        newUserData
      );
      res.status(200).json({
        data: updateUserData,
        message: "updated",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);
    const userData: User = req.user;

    try {
      if (userData.user_id === userId || userData.role != "USER") {
        const deleteUserData: User = await this.userService.deleteUserData(
          userId
        );
        res.status(200).json({
          data: deleteUserData,
          message: "deleted",
        });
      } else {
        res.status(403).json({
          message: `You are not allow to delete user with id ${userId}`,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;
