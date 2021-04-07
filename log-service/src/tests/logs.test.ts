import request from 'supertest';
import App from '../app';
import LoggerRoute from '../routes/logger.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Log Service', () => {
  describe('[POST] /logs', () => {
    it('response statusCode 200 / writeLogs', async () => {
      const loggerRoute = new LoggerRoute();
      const app = new App([loggerRoute]);
      return request(app.getServer()).post(`${loggerRoute.path}`).send({log: [4,3,2,1]}).expect(200);
    });
  });
});
