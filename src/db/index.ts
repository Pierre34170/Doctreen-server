import Sequelize from "sequelize";
import config from "./config";
import { logger } from "../utils/logger";
import UserModel from "./models/User.model";


const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize.Sequelize(
  config[env].url,
  {
    dialect: config[env].dialect,
    timezone: "+01:00",
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: true,
      freezeTableName: true,
    },
    logQueryParameters: env === "development",
    logging: (query, time) => {
      logger.info(time + "ms" + " " + query + "\n");
    },
    benchmark: true,
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("🟢 The database is connected.");
  })
  .catch((error: Error) => {
    logger.error(`🔴 Unable to connect to the database: ${error}.`);
  });

const DB = {
  User: UserModel(sequelize),
  sequelize,
  Sequelize,
};

export default DB;
