import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import { seedArrayMapper } from './factory/arrays.factory';
import ArraysRoute from './routes/arrays.route';
import WsRoute from './routes/ws.route.ts';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor() {
    const { app } = expressWs(express());
    const routes = [new ArraysRoute(), new WsRoute()];
    this.app = app;
    this.port = process.env.PORT || 3001;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initializeArrayMapper();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Client-Arrays-Service listening on the port ${this.port}`);
    });
  }

  // keep it for tests
  public getServer() {
    return this.app;
  }

  // log express req, res with morgan as option + cors config
  private initializeMiddlewares() {
    if (this.env === 'production') {
      // this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: `${process.env.UI_CLIENT_SERVICE}`, credentials: true }));
    } else if (this.env === 'development') {
      // this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    // secure mids with basic options
    this.app.use(hpp());
    this.app.use(helmet());

    // compress response body
    this.app.use(compression());

    // parse request body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Client-Arrays-Service docs',
          version: '1.0.0',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
    logger.info(`Swagger docs is available http://localhost:${process.env.PORT}/swagger`);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeArrayMapper() {
    seedArrayMapper();
  }
}

export default App;
