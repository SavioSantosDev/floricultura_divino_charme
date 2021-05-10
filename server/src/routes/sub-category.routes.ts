import { Router } from 'express';
import multer from 'multer';

import subCategoryController from '../controllers/sub-category.controller';

const routes = Router();
const upload = multer();

routes.post('/:categoryUniqueName', upload.none(), subCategoryController.store);
routes.get('/:categoryUniqueName', subCategoryController.index);
routes.get('/:categoryUniqueName/:uniqueName', subCategoryController.show);
routes.delete('/:categoryUniqueName/:uniqueName', subCategoryController.delete);
routes.put(
  '/:categoryUniqueName/:uniqueName',
  upload.none(),
  subCategoryController.update,
);

export default routes;
