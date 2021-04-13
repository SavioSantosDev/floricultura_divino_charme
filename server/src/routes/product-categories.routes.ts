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
routes.get('/:productCategoryId', productCategoriesController.show);
routes.delete('/:productCategoryId', productCategoriesController.delete);

// Update product category informations
routes.put('/:productCategoryId/name', productCategoriesController.updateName);
routes.put(
  '/:productCategoryId/keywords',
  productCategoriesController.updateKeywords,
);
routes.put(
  '/:productCategoryId/image',
  upload.single('image'),
  productCategoriesController.updateImage,
);

export default routes;
