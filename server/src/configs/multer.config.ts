import multer, { FileFilterCallback } from 'multer';
import { resolve, extname } from 'path';

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Accept only SVG, PNG and JPEG/JPG
  fileFilter: (
    req: unknown,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ): void => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/svg+xmls'
    ) {
      const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE');
      error.message = 'Only SVG, PNG and JPEG / JPG files allowed!';
      return cb(error);
    }
    return cb(null, true);
  },
  // Store the imagens on disk
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNumber()}${extname(file.originalname)}`);
    },
  }),
};
