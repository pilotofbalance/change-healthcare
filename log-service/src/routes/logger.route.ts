import { Router } from 'express';
import LoggerController from '../controllers/logs.controller';
import { LogsDto } from '../dtos/logs.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class LoggerRoute implements Route {
  public path = '/logs';
  public router = Router();
  public loggerController = new LoggerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(LogsDto, 'body'), this.loggerController.writeLogs);
  }
}

export default LoggerRoute;
