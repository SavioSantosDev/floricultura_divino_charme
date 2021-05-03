import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { ValidationError } from 'yup';
import { AppError } from './app.error';

class HandlingErrors {
  responseWithAnAppropriateError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    if (err instanceof ValidationError) {
      return res.status(400).json({
        error: err.errors,
      });
    }

    if (err instanceof MulterError) {
      return res.status(400).json({
        error: err.message,
      });
    }
    console.error(err);
    return res.status(500).json({
      error: 'Internal server error!',
    });
  }
}

export default new HandlingErrors();
