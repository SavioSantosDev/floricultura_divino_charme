import { Request, Response, NextFunction } from 'express';
import ProductCategoryService from '../services/product-category.service';

class ProductCategoryController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productCategoryService = new ProductCategoryService({
      ...req.body,
      image: req.file,
    });

    try {
      const createdProductCategory = await productCategoryService.store();
      return res.status(201).json(createdProductCategory);
    } catch (err) {
      await productCategoryService.removeImageFromUploads();
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productCategoryService = new ProductCategoryService({});
    try {
      const productCategories = await productCategoryService.index();
      return res.status(200).json(productCategories);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productCategoryService = new ProductCategoryService(req.params);
    try {
      const productCategory = await productCategoryService.show();
      return res.status(200).json(productCategory);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productCategoryService = new ProductCategoryService(req.params);

    try {
      const deletedProductCategory = await productCategoryService.delete();
      return res.status(200).json(deletedProductCategory);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productCategoryService = new ProductCategoryService({
      ...req.body,
      ...req.params,
      image: req.file,
    });

    try {
      const updatedProductCategory = await productCategoryService.update();
      return res.status(200).json(updatedProductCategory);
    } catch (err) {
      await productCategoryService.removeImageFromUploads();
      next(err);
    }
  }
}

export default new ProductCategoryController();
