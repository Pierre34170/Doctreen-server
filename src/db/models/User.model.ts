import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from '../../interfaces/models/User.interface';

export class UserModel extends Model implements User {
  user_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  password_user: string;
  description: string;
  nb_like: number;
  signal: number;
  role: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      // Model attributes are defined here
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password_user: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      nb_like: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      signal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      timestamps: false,
      sequelize, // We need to pass the connection instance
      modelName: "UserModel", // We need to choose the model name
      tableName: "users",
    }
  );

  return UserModel;
}
