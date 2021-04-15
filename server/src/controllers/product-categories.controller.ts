import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { unlinkSync } from 'fs';

import { AppError } from '../errors/app.error';
import simplifyString from '../utils/simplify-string';
import {
  ProductCategoryKeywordRepository,
  ProductCategoryRepository,
} from './../repositories/product-categories.repository';
import ProductCategory from '../models/ProductCategory';

export default class ProductsCategoriesController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const { name, keywords } = req.body;
      const image = req.file as Express.Multer.File;

      if (!image) {
        throw new AppError('No files uploaded!', 400);
      }

      // keywords = undefined | any or any[] ==> convert all to array
      const arrKeywords: string[] = keywords
        ? Array.isArray(keywords)
          ? (keywords as string[]).map((keyword) => simplifyString(keyword))
          : [simplifyString(keywords)]
        : [];

      // Make product-category data
      const data = {
        name: name as string,
        unique_name: simplifyString(name),
        keywords: arrKeywords,
        image: image.path,
      };

      // Validating data
      const keywordsSchema = yup
        .array()
        .of(yup.string().min(3).max(20))
        .max(20);

      const productCategorySchema = yup.object().shape({
        name: yup
          .string()
          .required('NAME is a required field')
          .min(3)
          .max(20, 'NAME must be at most 20 characters'),
        unique_name: yup.string().required().min(3).max(20),
        keywords: keywordsSchema,
      });
      await productCategorySchema.validate(data, { abortEarly: false });

      // Get repositories
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCategoryKeywordRepository = getCustomRepository(
        ProductCategoryKeywordRepository,
      );

      // Checking unique_name of the Product Category
      const productCategory = await productCategoryRepository.findOne({
        unique_name: data.unique_name,
      });
      if (productCategory) {
        throw new AppError('Category already exist!', 400);
      }

      // Creating instances of product category keywords
      const product_category_keywords = data.keywords.map((keyword) => {
        return productCategoryKeywordRepository.createProductCategoryKeyword(
          keyword,
        );
      });

      // Saving product-categorie data on database
      const createdProductCategory = await productCategoryRepository.createAndSaveProductCategory(
        {
          name: data.name,
          unique_name: data.unique_name,
          image: data.image,
          keywords: product_category_keywords,
        },
      );

      // Response with success and the createdProductCategory
      return res.status(201).json(createdProductCategory);
    } catch (err) {
      const image = req.file as Express.Multer.File;
      if (image) {
        unlinkSync(image.path);
      }
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCaterories = await productCategoryRepository.find({
        relations: ['keywords'],
      });
      return res.status(200).json(productCaterories);
    } catch (err) {
      next(err);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const { uniqueName } = req.params;
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCaterory = await productCategoryRepository.findOne({
        where: { unique_name: uniqueName },
        relations: ['keywords'],
      });
      if (!productCaterory) {
        throw new AppError('No product category has been found', 400);
      }

      return res.status(200).json(productCaterory);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const { uniqueName } = req.params;
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCategory = await productCategoryRepository.findOne({
        where: { unique_name: uniqueName },
        relations: ['keywords'],
      });
      if (!productCategory) {
        throw new AppError('No product category has been found', 400);
      }
      const deletedProductCategory = await productCategoryRepository.remove(
        productCategory,
      );

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
    try {
      // Get repositories
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCategoryKeywordRepository = getCustomRepository(
        ProductCategoryKeywordRepository,
      );

      // Checking if exists the product category
      const { uniqueName } = req.params;
      let productCategory: ProductCategory | undefined;
      productCategory = await productCategoryRepository.findOne({
        where: { unique_name: uniqueName },
      });
      if (!productCategory) {
        throw new AppError('No product category has been found', 400);
      }

      const { name, keywords } = req.body;
      const image = req.file as Express.Multer.File;

      if (!image) {
        throw new AppError('No files uploaded!', 400);
      }

      // keywords = undefined | any or any[] ==> convert all to array
      const arrKeywords: string[] = keywords
        ? Array.isArray(keywords)
          ? (keywords as string[]).map((keyword) => simplifyString(keyword))
          : [simplifyString(keywords)]
        : [];

      // Make product-category data
      const data = {
        name: name as string,
        unique_name: simplifyString(name),
        keywords: arrKeywords,
        image: image.path,
      };

      // Validating data
      const keywordsSchema = yup
        .array()
        .of(yup.string().min(3).max(20))
        .max(20);

      const productCategorySchema = yup.object().shape({
        name: yup
          .string()
          .required('NAME is a required field')
          .min(3)
          .max(20, 'NAME must be at most 20 characters'),
        unique_name: yup.string().required().min(3).max(20),
        keywords: keywordsSchema,
      });
      await productCategorySchema.validate(data, { abortEarly: false });

      // Checking unique_name of the Product Category
      productCategory = await productCategoryRepository.findOne({
        unique_name: data.unique_name,
      });
      if (productCategory) {
        throw new AppError('Category already exist!', 400);
      }

      // Creating instances of product category keywords
      const product_category_keywords = data.keywords.map((keyword) => {
        return productCategoryKeywordRepository.createProductCategoryKeyword(
          keyword,
        );
      });

      // Saving product-categorie data on database
      const createdProductCategory = await productCategoryRepository.createAndSaveProductCategory(
        {
          name: data.name,
          unique_name: data.unique_name,
          image: data.image,
          keywords: product_category_keywords,
        },
      );

      // Response with success and the createdProductCategory
      return res.status(201).json(createdProductCategory);
    } catch (err) {
      const image = req.file as Express.Multer.File;
      if (image) {
        unlinkSync(image.path);
      }
      next(err);
    }
  }
}
