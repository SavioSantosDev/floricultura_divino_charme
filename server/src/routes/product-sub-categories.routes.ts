import { Router } from 'express';
import multer from 'multer';

import ProductSubCategoriesController from '../controllers/product-sub-categories.controller';
import uploadConfig from '../configs/upload-product-sub-category.config';

const routes = Router();
const upload = multer(uploadConfig);
const productSubCategoriesController = new ProductSubCategoriesController();

routes.post(
  '/:productCategoryUniqueName/adicionar',
  upload.single('image'),
  productSubCategoriesController.store,
);
routes.get('/:productCategoryUniqueName', productSubCategoriesController.index);
routes.get(
  '/:productCategoryUniqueName/:unique_name',
  productSubCategoriesController.show,
);
routes.delete(
  '/:productCategoryUniqueName/:unique_name',
  productSubCategoriesController.delete,
);
routes.put(
  '/:productCategoryUniqueName/:unique_name',
  upload.single('image'),
  productSubCategoriesController.update,
);

export default routes;
