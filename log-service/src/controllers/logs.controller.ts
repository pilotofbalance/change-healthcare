import { NextFunction, Request, Response } from 'express';
import LoggerService from '../services/logger.service';
import { logger } from '../utils/logger';

class LoggerController {
  public loggerService = new LoggerService();

  public writeLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { log } = req.body;
      logger.info(`writeLogs execution`);
      await this.loggerService.writeLogs(log);
      res.status(200).json({ status: 'done', message: 'writeLogs' });
    } catch (error) {
      next(error);
    }
  };
}

export default LoggerController;
