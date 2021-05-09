import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

class ProductCategory {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const productService = new ProductService({
      ...req.body,
    });

    try {
      const createdProduct = await productService.store();
      return res.status(201).json(createdProduct);
    } catch (err) {
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const productService = new ProductService({});
    try {
      const products = await productService.index();
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const productService = new ProductService(req.params);
    try {
      const productCategory = await productService.show();
      return res.status(200).json(productCategory);
    } catch (err) {
      next(err);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const productService = new ProductService({
      ...req.body,
      ...req.params,
    });

    try {
      const updatedProduct = await productService.update();
      return res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const productService = new ProductService(req.params);

    try {
      const deletedProduct = await productService.delete();
      return res.status(200).json(deletedProduct);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductCategory();
