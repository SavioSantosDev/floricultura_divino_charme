import express from 'express';
import 'express-async-error';

import sendEmail from './routes/send-email.routes';
import handlingError from './errors/handling.error';

class App {
  app;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use('/api/send-email', sendEmail);
  }

  errors(): void {
    this.app.use(handlingError.responseWithAnAppropriateError);
  }
}

export default new App().app;
