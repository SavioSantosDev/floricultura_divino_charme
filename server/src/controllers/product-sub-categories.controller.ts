import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { unlinkSync } from 'fs';

import { AppError } from '../errors/app.error';
import simplifyString from '../utils/simplify-string';
import { ProductCategoryRepository } from '../repositories/product-categories.repository';
import {
  ProductSubCategoryKeywordRepository,
  ProductSubCategoryRepository,
} from '../repositories/product-sub-categories.repository';

export default class ProductsCategoriesController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );
      const productSubCategoryKeywordRepository = getCustomRepository(
        ProductSubCategoryKeywordRepository,
      );

      // Checking product category
      const { productCategoryUniqueName } = req.params;
      const productCategory = await productCategoryRepository.findOne({
        where: { unique_name: productCategoryUniqueName },
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
      const keywordsSchema = yup.array().of(yup.string().max(20)).max(20);
      const productCategorySchema = yup.object().shape({
        name: yup.string().required().max(20),
        unique_name: yup.string().required().max(20),
        keywords: keywordsSchema,
      });
      await productCategorySchema.validate(data, { abortEarly: false });

      // Checking unique_name of the Product Sub Category
      const productSubCategory = await productSubCategoryRepository.findOne({
        unique_name: data.unique_name,
      });
      if (productSubCategory) {
        throw new AppError('Product Sub Category already exist!', 400);
      }

      // Creating instances of product category keywords
      const createdKeywords = data.keywords.map((keyword) => {
        return productSubCategoryKeywordRepository.createKeyword(keyword);
      });

      // Saving product-categorie data on database
      const createdSubProductCategory = await productSubCategoryRepository.createAndSaveProductCategory(
        {
          name: data.name,
          unique_name: data.unique_name,
          image: data.image,
          product_category: productCategory,
          keywords: createdKeywords,
        },
      );

      // Response with success and the createdSubProductCategory
      return res.status(201).json(createdSubProductCategory);
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
      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );

      // Checking product category
      const { productCategoryUniqueName } = req.params;
      const productCategory = await productCategoryRepository.findOne({
        where: { unique_name: productCategoryUniqueName },
      });
      if (!productCategory) {
        throw new AppError('No product category has been found', 400);
      }
      const productCaterories = await productSubCategoryRepository.find({
        where: { product_category: productCategory },
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
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );

      // Checking product category
      const { productCategoryUniqueName, unique_name } = req.params;
      const product_category = await productCategoryRepository.findOne({
        where: { unique_name: productCategoryUniqueName },
      });
      if (!product_category) {
        throw new AppError('No product category has been found', 400);
      }

      const productSubCategory = await productSubCategoryRepository.findOne({
        where: { unique_name, product_category },
        relations: ['keywords'],
      });
      if (!productSubCategory) {
        throw new AppError('No product sub category has been found', 400);
      }

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
    try {
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );

      // Checking product category
      const { productCategoryUniqueName, unique_name } = req.params;
      const product_category = await productCategoryRepository.findOne({
        where: { unique_name: productCategoryUniqueName },
      });
      if (!product_category) {
        throw new AppError('No product category has been found', 400);
      }

      const productSubCategory = await productSubCategoryRepository.findOne({
        where: { unique_name, product_category },
        relations: ['keywords'],
      });
      if (!productSubCategory) {
        throw new AppError('No product sub category has been found', 400);
      }
      const deletedProductCategory = await productSubCategoryRepository.remove(
        productSubCategory,
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
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );
      const productSubCategoryKeywordRepository = getCustomRepository(
        ProductSubCategoryKeywordRepository,
      );

      // Checking product category
      const { productCategoryUniqueName, unique_name } = req.params;
      const product_category = await productCategoryRepository.findOne({
        where: { unique_name: productCategoryUniqueName },
      });
      if (!product_category) {
        throw new AppError('No product category has been found', 400);
      }
      // Checking product sub category
      let productSubCategory = await productSubCategoryRepository.findOne({
        where: { unique_name, product_category },
      });
      if (!productSubCategory) {
        throw new AppError('No product sub category has been found', 400);
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
        name: yup.string().required().min(3).max(20),
        unique_name: yup.string().required().min(3).max(20),
        keywords: keywordsSchema,
      });
      await productCategorySchema.validate(data, { abortEarly: false });

      // Checking unique_name of the Product Sub Category
      productSubCategory = await productSubCategoryRepository.findOne({
        unique_name: data.unique_name,
      });
      if (productSubCategory) {
        throw new AppError('Product Sub Category already exist!', 400);
      }

      // Creating instances of product category keywords
      const createdKeywords = data.keywords.map((keyword) => {
        return productSubCategoryKeywordRepository.createKeyword(keyword);
      });

      // Saving product-categorie data on database
      const updatedSubProductCategory = await productSubCategoryRepository.save(
        {
          name: data.name,
          unique_name: data.unique_name,
          image: data.image,
          product_category,
          keywords: createdKeywords,
        },
      );

      // Response with success and the createdProductCategory
      return res.status(200).json(updatedSubProductCategory);
    } catch (err) {
      const image = req.file as Express.Multer.File;
      if (image) {
        unlinkSync(image.path);
      }
      next(err);
    }
  }
}
