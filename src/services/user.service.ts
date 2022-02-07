import { isEmpty } from "../utils/util";
import DB from "../db";
import { User } from "../interfaces/models/User.interface";
import HttpException from "../exceptions/HttpException";
import { Op, Sequelize } from 'sequelize';
import { CreateUserDto } from "../dtos/user.dto";
import bcrypt from "bcrypt";

class UserService {
  public user = DB.User;

  public async findAllUsers(): Promise<User[]> {
    const users: User[] = await this.user.findAll();
    return users;
  }
  
  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "No data received");

    const findUser: User = await this.user.findByPk(userId);
    if (!findUser) throw new HttpException(409, `There is no user with id ${userId}`);
    return findUser;
  }

  public async findUserByName(search: string ): Promise<User[]> {
    if (isEmpty(search)) return await this.findAllUsers();
    const findUser: User[] = await this.user.findAll({
      where: Sequelize.where(Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), {
        [Op.like]: `%${search}%`,
      }),
    });

    if (!findUser) return [];
    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.user.findOne({ where: { email_address: userData.email_address } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email_address} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password_user, 10);
    const createUserData: User = await this.user.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No data received");
    console.log("lalala")

    const findUser: User = await this.user.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.user.update(
      {
        ...userData,
      },
      {
        where: {
          user_id: userId,
        },
      },
    );

    const updateUser: User = await this.user.findByPk(userId);
    return updateUser;
  }

  public async deleteUserData(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "No data received");

    const findUser: User = await this.user.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.user.destroy({ where: { user_id: userId } });

    return findUser;
  }
}

export default UserService;
