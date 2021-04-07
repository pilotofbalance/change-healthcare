import 'dotenv/config';
import App from './app';
import LoggerRoute from './routes/logger.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new LoggerRoute()]);

app.listen();
