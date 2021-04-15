import { Router } from 'express';
import multer from 'multer';

import ProductCategoriesController from '../controllers/product-categories.controller';
import uploadConfig from '../configs/upload-product-category.config';

const routes = Router();
const upload = multer(uploadConfig);
const productCategoriesController = new ProductCategoriesController();

routes.post(
  '/adicionar',
  upload.single('image'),
  productCategoriesController.store,
);
routes.get('/', productCategoriesController.index);
routes.get('/:uniqueName', productCategoriesController.show);
routes.delete('/:uniqueName', productCategoriesController.delete);
routes.put(
  '/:uniqueName',
  upload.single('image'),
  productCategoriesController.update,
);

export default routes;
