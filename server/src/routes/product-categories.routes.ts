import { Router } from 'express';
import multer from 'multer';

import productCategoryController from '../controllers/product-category.controller';
import uploadConfig from '../configs/upload-product-category.config';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', upload.single('image'), productCategoryController.store);
routes.get('/', productCategoryController.index);
routes.get('/:uniqueName', productCategoryController.show);
routes.delete('/:uniqueName', productCategoryController.delete);
routes.put(
  '/:uniqueName',
  upload.single('image'),
  productCategoryController.update,
);

export default routes;
