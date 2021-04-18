import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { unlinkSync } from 'fs';

import { AppError } from '../errors/app.error';
import simplifyString from '../utils/simplify-string';

import Repositories from '../repositories/custom-repositories';
import ProductCategory from '../models/ProductCategory';
import ProductSubCategory from '../models/ProductSubCategory';
import { ProductSubCategoryKeyword } from '../models/Keywords';

class Schemas {
  static nameSchema = yup.string().required().max(20);
  static keywordsSchema = yup.array().of(yup.string().max(20)).max(20);

  static async validateNameSchema(name?: string) {
    await Schemas.nameSchema.validate(name, { abortEarly: false });
  }

  static async validateKeywordsSchema(keywrods?: string[]) {
    await Schemas.keywordsSchema.validate(keywrods, { abortEarly: false });
  }
}

class UserErrors {
  static noFilesUploaded(): never {
    throw new AppError('No files uploaded!', 400);
  }

  static productSubCategoryAlreadyExists(): never {
    throw new AppError('Product Sub Category already exist!', 400);
  }

  static noProductSubCategoryHasBeenFound(): never {
    throw new AppError('No Product Sub Category has been found', 400);
  }

  static noProductCategoryHasBeenFound(): never {
    throw new AppError('No Product Category has been found', 400);
  }
}

type Keywords = undefined | string | string[];

class StoreAndUpdate {
  private storeName?: string;
  private storeUniqueName?: string;
  private storeKeywords?: ProductSubCategoryKeyword[];
  private storeImage?: Express.Multer.File;
  private storeProductCategory?: ProductCategory;

  private keywords?: string[]; // Received
  private productSubCategory?: ProductSubCategory;

  constructor(
    private readonly productCategoryUniqueName: string,
    name: unknown,
    keywords: Keywords,
    image: unknown,
    private readonly uniqueName?: string,
  ) {
    if (name && typeof name === 'string') {
      this.storeName = name;
      this.storeUniqueName = simplifyString(name);
    }
    this.storeImage = image as Express.Multer.File;
    this.keywords = this.convertKeywordsToArray(keywords);
  }

  private convertKeywordsToArray(keywords: Keywords) {
    return keywords
      ? Array.isArray(keywords)
        ? (keywords as string[]).map((keyword) => simplifyString(keyword))
        : [simplifyString(keywords)]
      : [];
  }

  private throwErrorIfNoFilesUploaded() {
    if (!this.storeImage) {
      UserErrors.noFilesUploaded();
    }
  }

  private async getProductCategory() {
    this.storeProductCategory = await Repositories.productCategory().findOne({
      unique_name: this.productCategoryUniqueName,
    });
  }

  private errorIfNoProductCategoryHasBeenFound() {
    if (!this.storeProductCategory) {
      UserErrors.noProductCategoryHasBeenFound();
    }
  }

  private async errorIfProductSubCategoryAlreadyExists() {
    const productSubCategory = await Repositories.productSubCategory().findOne({
      where: {
        unique_name: this.storeUniqueName,
        product_category: this.storeProductCategory,
      },
      relations: ['keywords'],
    });
    if (productSubCategory) {
      UserErrors.productSubCategoryAlreadyExists();
    }
  }

  private async errorIfNoProductSubCategoryHasBeenFound() {
    const productSubCategory = await Repositories.productSubCategory().findOne({
      where: {
        unique_name: this.uniqueName,
        product_category: this.storeProductCategory,
      },
      relations: ['keywords'],
    });
    if (!productSubCategory) {
      UserErrors.noProductSubCategoryHasBeenFound();
    }
  }

  private createInstancesOfKeywords() {
    if (this.keywords) {
      this.storeKeywords = this.keywords.map((keyword) => {
        const productSubCategoryKeyword = new ProductSubCategoryKeyword();
        productSubCategoryKeyword.keyword = keyword;
        return productSubCategoryKeyword;
      });
    }
  }

  private createProductSubCategory() {
    this.createInstancesOfKeywords();
    return Repositories.productSubCategory().create({
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
      keywords: this.storeKeywords,
      product_category: this.storeProductCategory,
    });
  }

  private async saveProductSubCategoryOnDatabase() {
    if (this.productSubCategory) {
      await Repositories.productSubCategory().save(this.productSubCategory);
    }
  }

  removeImageFromUploads() {
    if (this.storeImage) {
      unlinkSync(this.storeImage.path);
    }
  }

  /**
   * Public method called for store a new produt sub category
   */
  async storeAndGetCreatedProductSubCategory(): Promise<ProductSubCategory> {
    await this.getProductCategory();
    this.errorIfNoProductCategoryHasBeenFound();

    this.throwErrorIfNoFilesUploaded();

    await Schemas.validateNameSchema(this.storeName);
    await Schemas.validateNameSchema(this.storeUniqueName);
    await Schemas.validateKeywordsSchema(this.keywords);

    await this.errorIfProductSubCategoryAlreadyExists();

    this.productSubCategory = this.createProductSubCategory();
    await this.saveProductSubCategoryOnDatabase();
    return this.productSubCategory;
  }

  /**
   * Public method called for update data of the exist product sub category
   */
  async updateAndGetUpdatedProductSubCategory(): Promise<ProductSubCategory> {
    await this.getProductCategory();
    this.errorIfNoProductCategoryHasBeenFound();

    this.throwErrorIfNoFilesUploaded();
    await this.errorIfNoProductSubCategoryHasBeenFound();

    await Schemas.validateNameSchema(this.storeName);
    await Schemas.validateNameSchema(this.storeUniqueName);
    await Schemas.validateKeywordsSchema(this.keywords);

    await this.errorIfProductSubCategoryAlreadyExists();

    this.productSubCategory = this.createProductSubCategory();
    await this.saveProductSubCategoryOnDatabase();
    return this.productSubCategory;
  }
}

/**
 * Methods that don't need to handle request data - Index, Show and Delete
 */
class IndexAndShowAndDelete {
  private productSubCategories?: ProductSubCategory[];
  private productSubCategory?: ProductSubCategory | undefined;
  private productCategory?: ProductCategory;

  constructor(
    private readonly productCategoryUniqueName: string,
    private readonly unique_name?: string,
  ) {}

  private async getProductCategory() {
    this.productCategory = await Repositories.productCategory().findOne({
      unique_name: this.productCategoryUniqueName,
    });
  }

  private throwErrorIfNoProductCategoryHasBeenFound() {
    if (!this.productCategory) {
      UserErrors.noProductCategoryHasBeenFound();
    }
  }

  private async findAllProductSubCategories() {
    return await Repositories.productSubCategory().find({
      where: { product_category: this.productCategory },
      relations: ['keywords'],
    });
  }

  private async findOneProductSubCategory() {
    return await Repositories.productSubCategory().findOne({
      where: {
        unique_name: this.unique_name,
        product_category: this.productCategory,
      },
      relations: ['keywords'],
    });
  }

  async getAllProductSubCategories(): Promise<ProductSubCategory[]> {
    await this.getProductCategory();
    this.throwErrorIfNoProductCategoryHasBeenFound();
    this.productSubCategories = await this.findAllProductSubCategories();
    return this.productSubCategories;
  }

  async getOneProductSubCategory(): Promise<ProductSubCategory> {
    await this.getProductCategory();
    this.throwErrorIfNoProductCategoryHasBeenFound();

    this.productSubCategory = await this.findOneProductSubCategory();
    if (!this.productSubCategory) {
      UserErrors.noProductSubCategoryHasBeenFound();
    }
    return this.productSubCategory;
  }

  async removeOneProductSubCategory(): Promise<ProductSubCategory> {
    await this.getProductCategory();
    this.throwErrorIfNoProductCategoryHasBeenFound();

    const productSubCategory = await this.getOneProductSubCategory();
    return await Repositories.productSubCategory().remove(productSubCategory);
  }
}

export default class ProductsCategoriesController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const { productCategoryUniqueName } = req.params;
    const { name, keywords } = req.body;
    const image = req.file;
    const store = new StoreAndUpdate(
      productCategoryUniqueName,
      name,
      keywords,
      image,
    );

    try {
      const createdProductCategory = await store.storeAndGetCreatedProductSubCategory();
      return res.status(201).json(createdProductCategory);
    } catch (err) {
      store.removeImageFromUploads();
      next(err);
    }
  }

  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const { productCategoryUniqueName } = req.params;
    const index = new IndexAndShowAndDelete(productCategoryUniqueName);
    try {
      const productSubCategories = await index.getAllProductSubCategories();
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
    const { productCategoryUniqueName, uniqueName } = req.params;
    const show = new IndexAndShowAndDelete(
      productCategoryUniqueName,
      uniqueName,
    );

    try {
      const productSubCategory = await show.getOneProductSubCategory();
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
    const { productCategoryUniqueName, uniqueName } = req.params;
    const _delete = new IndexAndShowAndDelete(
      productCategoryUniqueName,
      uniqueName,
    );

    try {
      const deletedProductCategory = await _delete.removeOneProductSubCategory();
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
    const { productCategoryUniqueName, uniqueName } = req.params;
    const { name, keywords } = req.body;
    const image = req.file;
    const store = new StoreAndUpdate(
      productCategoryUniqueName,
      name,
      keywords,
      image,
      uniqueName,
    );

    try {
      const updatedProductCategory = await store.updateAndGetUpdatedProductSubCategory();
      return res.status(200).json(updatedProductCategory);
    } catch (err) {
      store.removeImageFromUploads();
      next(err);
    }
  }
}
