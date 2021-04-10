import { ArraysModel } from '../interfaces/arrays.interface';
import ArraysService from '../services/arrays.service';
import { logger } from '../utils/logger';

class WsController {
  public arrayService = new ArraysService();

  public getArray = async (value: string): Promise<ArraysModel> => {
    try {
      const key = Number(value);
      logger.info(`getArray execution`);
      return await this.arrayService.getArray(key);
    } catch (error) {
      logger.error(error);
    }
  };
}

export default WsController;
