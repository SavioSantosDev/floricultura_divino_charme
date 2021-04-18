import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { unlinkSync } from 'fs';

import { AppError } from '../errors/app.error';
import simplifyString from '../utils/simplify-string';
import ProductCategory from '../models/ProductCategory';
import { ProductCategoryKeyword } from '../models/Keywords';
import Repositories from '../repositories/custom-repositories';

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

  static productCategoryAlreadyExists(): never {
    throw new AppError('Category already exist!', 400);
  }

  static noProductCategoriesHasBeenFound(): never {
    throw new AppError('No product category has been found', 400);
  }
}

type Keywords = undefined | string | string[];

class StoreAndUpdate {
  private storeName?: string;
  private storeUniqueName?: string;
  private keywords?: string[]; // Received
  private storeKeywords?: ProductCategoryKeyword[];
  private storeImage?: Express.Multer.File;
  private productCategory?: ProductCategory;

  constructor(
    name: unknown,
    keywords: Keywords,
    image: unknown,
    public readonly uniqueName?: string,
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

  private checkFilesUpload() {
    if (!this.storeImage) {
      UserErrors.noFilesUploaded();
    }
  }

  private async errorIfProductCategoryAlreadyExists() {
    const productCateogry = await Repositories.productCategory().findOne({
      where: { unique_name: this.storeUniqueName },
      relations: ['keywords'],
    });
    if (productCateogry) {
      UserErrors.productCategoryAlreadyExists();
    }
  }

  private async errorIfNoProductCategoryHasBeenFound() {
    const productCategory = await Repositories.productCategory().findOne({
      where: { unique_name: this.uniqueName },
      relations: ['keywords'],
    });
    if (!productCategory) {
      UserErrors.noProductCategoriesHasBeenFound();
    }
  }

  private createInstancesOfKeywords() {
    if (this.keywords) {
      this.storeKeywords = this.keywords.map((keyword) => {
        const productCategoryKeyword = new ProductCategoryKeyword();
        productCategoryKeyword.keyword = keyword;
        return productCategoryKeyword;
      });
    }
  }

  private createProductCategory() {
    this.createInstancesOfKeywords();
    return Repositories.productCategory().create({
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
      keywords: this.storeKeywords,
    });
  }

  private async saveProductCategoryOnDatabase() {
    if (this.productCategory) {
      await Repositories.productCategory().save(this.productCategory);
    }
  }

  removeImageFromUploads() {
    if (this.storeImage) {
      unlinkSync(this.storeImage.path);
    }
  }

  /**
   * Public method called for store a new produt category
   */
  async storeAndGetCreatedProductCategory(): Promise<ProductCategory> {
    this.checkFilesUpload();

    await Schemas.validateNameSchema(this.storeName);
    await Schemas.validateNameSchema(this.storeUniqueName);
    await Schemas.validateKeywordsSchema(this.keywords);

    await this.errorIfProductCategoryAlreadyExists();

    this.productCategory = this.createProductCategory();
    await this.saveProductCategoryOnDatabase();
    return this.productCategory;
  }

  /**
   * Public method called for update data of the exist product category
   */
  async updateAndGetUpdatedProductCategory(): Promise<ProductCategory> {
    this.checkFilesUpload();
    await this.errorIfNoProductCategoryHasBeenFound();

    await Schemas.validateNameSchema(this.storeName);
    await Schemas.validateNameSchema(this.storeUniqueName);
    await Schemas.validateKeywordsSchema(this.keywords);

    await this.errorIfProductCategoryAlreadyExists();

    this.productCategory = this.createProductCategory();
    await this.saveProductCategoryOnDatabase();
    return this.productCategory;
  }
}

/**
 * Methods that don't need to handle request data - Index, Show and Delete
 */
class IndexAndShowAndDelete {
  private productCategories!: ProductCategory[];
  private productCategory!: ProductCategory | undefined;

  constructor(public readonly unique_name?: string) {}

  private async findAllProductCategories() {
    this.productCategories = await Repositories.productCategory().find({
      relations: ['keywords'],
    });
  }

  private async findOneProductCategory() {
    this.productCategory = await Repositories.productCategory().findOne({
      where: { unique_name: this.unique_name },
      relations: ['keywords'],
    });
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    await this.findAllProductCategories();
    return this.productCategories;
  }

  async getOneProductCategory(): Promise<ProductCategory> {
    await this.findOneProductCategory();
    if (!this.productCategory) {
      UserErrors.noProductCategoriesHasBeenFound();
    }
    return this.productCategory;
  }

  async removeOneProductCategory(): Promise<ProductCategory> {
    const productCategory = await this.getOneProductCategory();
    return await Repositories.productCategory().remove(productCategory);
  }
}

export default class ProductsCategoriesController {
  async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> {
    const { name, keywords } = req.body;
    const image = req.file;
    const store = new StoreAndUpdate(name, keywords, image);

    try {
      const createdProductCategory = await store.storeAndGetCreatedProductCategory();
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
    const index = new IndexAndShowAndDelete();
    try {
      const productCategories = await index.getAllProductCategories();
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
    const { uniqueName } = req.params;
    const show = new IndexAndShowAndDelete(uniqueName);
    try {
      const productCategory = await show.getOneProductCategory();
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
    const { uniqueName } = req.params;
    const _delete = new IndexAndShowAndDelete(uniqueName);

    try {
      const deletedProductCategory = await _delete.removeOneProductCategory();
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
    const { name, keywords } = req.body;
    const image = req.file;
    const { uniqueName } = req.params;
    const update = new StoreAndUpdate(name, keywords, image, uniqueName);

    try {
      const updatedProductCategory = await update.updateAndGetUpdatedProductCategory();
      return res.status(201).json(updatedProductCategory);
    } catch (err) {
      update.removeImageFromUploads();
      next(err);
    }
  }
}
