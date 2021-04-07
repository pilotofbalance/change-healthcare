import { logger } from "../utils/logger";

const arraysMapper = new Map<number, number[]>();

const generateArray = (length: number) => {
  return [ ...Array(length).keys() ].map(k => length - k);
}

const seedArrayMapper = () => {
  for(let i = 1; i <= 1000; i++) {
    const key = i - 1;
    const value = generateArray(key);
    arraysMapper.set(i, value);
  }
  logger.info(`Array [1...1000] seeded to the Map`);
}

const getArrayByKey = (key: number) => {
  return arraysMapper.get(key);
}

export { seedArrayMapper, getArrayByKey };
