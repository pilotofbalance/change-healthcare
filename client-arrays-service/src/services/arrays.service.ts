import { getArrayByKey } from '../factory/arrays.factory';
import { ArraysModel } from '../interfaces/arrays.interface';
import { logger } from '../utils/logger';

class ArraysService {
  public async getArray(key: number): Promise<ArraysModel> {
    const value: number[] = getArrayByKey(key);
    const result = { key, value };
    // notice log-service about obtained result
    logger.warn(JSON.stringify(result))
    return result;
  }
}

export default ArraysService;
