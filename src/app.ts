import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import DB from "./db";
import Routes from "./interfaces/route.interface";
import errorMiddleware from "./middlewares/error.middleware";
import portfinder from "portfinder";
import { logger, stream } from "./utils/logger";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.env = process.env.NODE_ENV || "development";

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    portfinder.basePort = Number(this.port); // default: 3000

    portfinder
      .getPortPromise()
      .then((port) => {
        this.app.listen(port, () => {
          logger.info(`🚀 App listening on the port ${port}`);
        });
      })
      .catch(() => {
        logger.error(`🤕 Could not find valid port`);
      });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    // Force : true -> Drop all table and recreate them
    DB.sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Sequelize connected !");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private initializeMiddlewares() {
    if (this.env === "production") {
      this.app.use(morgan("combined", { stream }));
    } else if (this.env === "development") {
      this.app.use(morgan("dev", { stream }));
    }

    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({ origin: process.env.APP_URL, credentials: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
