import { Router } from 'express';
import WsController from '../controllers/ws.controller';
import Route from '../interfaces/routes.interface';

class WsRoute implements Route {
  public path = '/ws';
  public router = Router();
  public wsController = new WsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.ws(`${this.path}`, (ws, req) => {
      ws.on('message', async (key: string) => {
        const result = await this.wsController.getArray(key);
        ws.send(JSON.stringify(result));
      });
    });
  }
}

export default WsRoute;
