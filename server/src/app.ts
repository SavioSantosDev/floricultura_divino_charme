import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import express from 'express';
import { resolve } from 'path';
// import 'express-async-error';

// import sendEmail from './routes/send-email.routes';
import createConnection from './database/';
import productCategoriesRoutes from './routes/product-categories.routes';
import productSubCategoriesRoutes from './routes/product-sub-categories.routes';
import handlingError from './errors/handling.error';

class App {
  app;

  constructor() {
    createConnection();
    this.app = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  private routes(): void {
    // this.app.use('/api/send-email', sendEmail);
    this.app.use('/admin/categorias', productCategoriesRoutes);
    this.app.use('/admin/sub-categorias', productSubCategoriesRoutes);
  }

  private errors(): void {
    this.app.use(handlingError.responseWithAnAppropriateError);
  }
}

export default new App().app;
