import { Request, Response, NextFunction } from 'express';
import ProductSubCategoryService from '../services/product-sub-category.service';

class ProductSubCategoryController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productSubCategoryService = new ProductSubCategoryService({
      ...req.body,
      ...req.params,
      image: req.file,
    });

    try {
      const createdProductSubCategory = await productSubCategoryService.store();
      return res.status(201).json(createdProductSubCategory);
    } catch (err) {
      await productSubCategoryService.removeImageFromUploads();
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productSubCategoryService = new ProductSubCategoryService(req.params);
    try {
      const productSubCategories = await productSubCategoryService.index();
      return res.status(200).json(productSubCategories);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productSubCategoryService = new ProductSubCategoryService(req.params);

    try {
      const productSubCategory = await productSubCategoryService.show();
      return res.status(200).json(productSubCategory);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productSubCategoryService = new ProductSubCategoryService(req.params);

    try {
      const deletedProductSubCategory = await productSubCategoryService.delete();
      return res.status(200).json(deletedProductSubCategory);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const productSubCategoryService = new ProductSubCategoryService({
      ...req.body,
      ...req.params,
      image: req.file,
    });

    try {
      const updatedProductSubCategory = await productSubCategoryService.update();
      return res.status(200).json(updatedProductSubCategory);
    } catch (err) {
      await productSubCategoryService.removeImageFromUploads();
      next(err);
    }
  }
}

export default new ProductSubCategoryController();
