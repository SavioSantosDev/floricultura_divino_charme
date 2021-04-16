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
// routes.get('/', productCategoriesController.index);
// routes.get('/:uniqueName', productCategoriesController.show);
// routes.delete('/:uniqueName', productCategoriesController.delete);
// routes.put(
//   '/:uniqueName',
//   upload.single('image'),
//   productCategoriesController.update,
// );

export default routes;
