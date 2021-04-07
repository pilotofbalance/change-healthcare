import { NextFunction, Request, Response } from 'express';
import { ArraysModel } from '../interfaces/arrays.interface';
import ArraysService from '../services/arrays.service';
import { logger } from '../utils/logger';

class ArraysController {
  public arrayService = new ArraysService();

  public getArray = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = Number(req.params.key);
      logger.info(`getArray execution`);
      const getArrayData: ArraysModel = await this.arrayService.getArray(key);
      res.status(200).json({ data: getArrayData, message: 'getArray' });
    } catch (error) {
      next(error);
    }
  };
}

export default ArraysController;
