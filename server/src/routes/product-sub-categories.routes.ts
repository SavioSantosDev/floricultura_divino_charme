import { Router } from 'express';
import multer from 'multer';

import productSubCategoryController from '../controllers/product-sub-category.controller';
import uploadConfig from '../configs/upload-product-sub-category.config';

const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  '/:productCategoryUniqueName',
  upload.single('image'),
  productSubCategoryController.store,
);
routes.get('/:productCategoryUniqueName', productSubCategoryController.index);
routes.get(
  '/:productCategoryUniqueName/:uniqueName',
  productSubCategoryController.show,
);
routes.delete(
  '/:productCategoryUniqueName/:uniqueName',
  productSubCategoryController.delete,
);
routes.put(
  '/:productCategoryUniqueName/:uniqueName',
  upload.single('image'),
  productSubCategoryController.update,
);

export default routes;
