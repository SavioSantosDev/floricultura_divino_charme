import { Router } from 'express';
import multer from 'multer';

import productController from '../controllers/product.controller';
// import uploadConfig from '../configs/upload-product.config';

const routes = Router();
const upload = multer();

routes.post('/', upload.none(), productController.store);
routes.get('/', productController.index);
routes.get('/:uniqueName', productController.show);
routes.delete('/:uniqueName', productController.delete);
routes.put('/:uniqueName', upload.none(), productController.update);

export default routes;
