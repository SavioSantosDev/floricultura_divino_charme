import multer, { FileFilterCallback, MulterError } from 'multer';
import { resolve, extname } from 'path';

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

//file.mimetype !== 'image/svg+xmls' PARA SVG

const fileFilter = (
  req: unknown,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
    const err = new MulterError('LIMIT_UNEXPECTED_FILE');
    err.message = 'Only PNG and JPEG/JPG files allowed!';
    return cb(err);
  }
  return cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        'images',
        'products',
        'categories',
      ),
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${randomNumber()}${extname(file.originalname)}`);
  },
});

export default {
  fileFilter,
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
