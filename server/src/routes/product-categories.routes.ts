import { Router } from 'express';
import multer from 'multer';

import ProductCategoriesController from '../controllers/product-categories.controller';
import multerConfig from '../configs/multer.config';

const routes = Router();
const upload = multer(multerConfig);
const productCategoriesController = new ProductCategoriesController();

routes.post(
  '/adicionar',
  upload.single('image'),
  productCategoriesController.store,
);
routes.get('/', productCategoriesController.index);
routes.get('/:productCategoryId', productCategoriesController.show);

export default routes;
