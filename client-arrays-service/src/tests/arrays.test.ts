import request from 'supertest';
import App from '../app';
import ArraysRoute from '../routes/arrays.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Arrays Service', () => {
  describe('[POST] /arrays/:key', () => {
    it('response statusCode 200 / getArray', async () => {
      const arraysRoute = new ArraysRoute();
      const app = new App();
      return request(app.getServer()).post(`${arraysRoute.path}/5`).send().expect(200);
    });
  });
});
