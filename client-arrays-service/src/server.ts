import 'dotenv/config';
import App from './app';
import ArraysRoute from './routes/arrays.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new ArraysRoute()]);

app.listen();
