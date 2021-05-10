import { Request, Response, NextFunction } from 'express';
import { SubCategoryService } from '../services/sub-category.service';

class SubCategoryController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const subCategoryService = new SubCategoryService({
      ...req.body,
      ...req.params,
    });

    try {
      const createdSubCategory = await subCategoryService.store();
      return res.status(201).json(createdSubCategory);
    } catch (err) {
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const subCategoryService = new SubCategoryService(req.params);
    try {
      const subCategories = await subCategoryService.index();
      return res.status(200).json(subCategories);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const subCategoryService = new SubCategoryService(req.params);

    try {
      const subCategory = await subCategoryService.show();
      return res.status(200).json(subCategory);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const subCategoryService = new SubCategoryService(req.params);

    try {
      const removedSubCategory = await subCategoryService.delete();
      return res.status(200).json(removedSubCategory);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const subCategoryService = new SubCategoryService({
      ...req.body,
      ...req.params,
    });

    try {
      const updatedSubCategory = await subCategoryService.update();
      return res.status(200).json(updatedSubCategory);
    } catch (err) {
      next(err);
    }
  }
}

export default new SubCategoryController();
