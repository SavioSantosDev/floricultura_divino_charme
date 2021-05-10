import { Router } from 'express';
import multer from 'multer';

import CategoryController from '../controllers/category.controller';

const routes = Router();
const upload = multer();

routes.post('/', upload.none(), CategoryController.store);
routes.get('/', CategoryController.index);
routes.get('/:uniqueName', CategoryController.show);
routes.delete('/:uniqueName', CategoryController.delete);
routes.put('/:uniqueName', upload.none(), CategoryController.update);

export default routes;
