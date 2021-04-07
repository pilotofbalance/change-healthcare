import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LOG_SERVICE: str(),
    UI_CLIENT_SERVICE: str(),
  });
};

export default validateEnv;
