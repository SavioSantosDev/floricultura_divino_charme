import { Request, Response, NextFunction } from 'express';
import { getCustomRepository, In } from 'typeorm';
import * as yup from 'yup';

import { AppError } from '../errors/app.error';
import ProductCategoryRepository from '../repositories/product-category.repository';
import ProductSubCategoryRepository from '../repositories/product-sub-category.repository';
import simplifyString from '../utils/simplify-string';

export default class ProductsCategoriesController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    try {
      const { name, subCategories } = req.body;
      const image = req.file as Express.Multer.File;

      if (!image) {
        throw new AppError('No files uploaded!', 400);
      }

      // subCategories = undefined, 'value' or ['value1', 'value2'...];
      // Convert all to array
      const productSubCategories: {
        name: string;
        unique_name: string;
      }[] = subCategories
        ? Array.isArray(subCategories)
          ? (subCategories as string[]).map((name: string) => {
              return { name, unique_name: simplifyString(name) };
            })
          : [{ name: subCategories, unique_name: simplifyString(name) }]
        : [];

      // Make product-category data
      const data = {
        name: name as string,
        unique_name: simplifyString(name),
        sub_categories: productSubCategories,
        image: image.path,
      };
      // Validating data
      const schema = yup.object().shape({
        name: yup.string().required().min(3).max(30),
        unique_name: yup.string().required().min(3).max(30),
        sub_categories: yup
          .array()
          .of(
            yup.object().shape({
              name: yup.string().min(3).max(30),
              unique_name: yup.string().min(3).max(30),
            }),
          )
          .max(8),
      });
      await schema.validate(data, { abortEarly: false });

      const productSubCategoryRepository = getCustomRepository(
        ProductSubCategoryRepository,
      );
      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );

      // Checking unique_name of the Product Category
      const productCategory = await productCategoryRepository.findOne({
        unique_name: data.unique_name,
      });
      if (productCategory) {
        throw new AppError('Category already exist!', 400);
      }

      // Checking unique_name of the Sub categories
      const subCategoryUniqueNames = data.sub_categories.map(
        (value) => value.unique_name,
      );
      const productSubCategory = await productSubCategoryRepository.findOne({
        where: { unique_name: In(subCategoryUniqueNames) },
        relations: ['product_category'],
      });
      if (productSubCategory) {
        throw new AppError('Sub Category already exist!', 400);
      }

      // Creating product sub-categories
      const sub_categories = data.sub_categories.map((productSubCategory) => {
        return productSubCategoryRepository.createProductSubCategory(
          productSubCategory,
        );
      });

      // Saving product-categorie data on database
      const createdProductCategory = await productCategoryRepository.createAndSaveProductCategory(
        {
          name: data.name,
          unique_name: data.unique_name,
          sub_categories,
          image: data.image,
        },
      );

      // Response with success and the createdProductCategory
      return res.status(201).json(createdProductCategory);
    } catch (err) {
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
        relations: ['sub_categories'],
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
      const { productCategoryId } = req.params;
      if (!productCategoryId) {
        throw new AppError('Missing productCategoryId', 400);
      }

      const productCategoryRepository = getCustomRepository(
        ProductCategoryRepository,
      );
      const productCaterory = await productCategoryRepository.findOne({
        where: { id: productCategoryId },
        relations: ['sub_categories'],
      });
      if (!productCaterory) {
        throw new AppError('no product categories has been found', 400);
      }

      return res.status(200).json(productCaterory);
    } catch (err) {
      next(err);
    }
  }
}
