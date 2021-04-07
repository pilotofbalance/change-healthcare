import { Router } from 'express';
import ArraysController from '../controllers/arrays.controller';
import { ArraysDto } from '../dtos/arrays.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class ArraysRoute implements Route {
  public path = '/arrays';
  public router = Router();
  public arraysController = new ArraysController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:key(\\d+)`, validationMiddleware(ArraysDto, 'params'), this.arraysController.getArray);
  }
}

export default ArraysRoute;
