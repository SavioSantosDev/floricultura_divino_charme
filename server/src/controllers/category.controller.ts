import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';

class CategoryController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const categoryService = new CategoryService(req.body);

    try {
      const createCategory = await categoryService.store();
      return res.status(201).json(createCategory);
    } catch (err) {
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const categoryService = new CategoryService({});
    try {
      const categories = await categoryService.index();
      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const categoryService = new CategoryService(req.params);
    try {
      const category = await categoryService.show();
      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const categoryService = new CategoryService(req.params);

    try {
      const removedCategory = await categoryService.delete();
      return res.status(200).json(removedCategory);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const categoryService = new CategoryService({
      ...req.body,
      ...req.params,
    });

    try {
      const updatedCategory = await categoryService.update();
      return res.status(200).json(updatedCategory);
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
