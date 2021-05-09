import { AppError } from '../errors/app.error';
import ProductCategoryModel from '../models/product-category.model';
import ProductSubCategoryModel from '../models/product-sub-category.model';
import Repositories from '../utils/custom-repositories';
import { removeOneFile } from '../utils/manage-files';
import { CategorySchema } from '../utils/schemas';
import simplifyString from '../utils/simplify-string';

class ClientErrors {
  static noFilesUploaded(): never {
    throw new AppError('No files uploaded!', 400);
  }

  static productSubCategoryAlreadyExists(): never {
    throw new AppError('Product Sub Category already exist!', 400);
  }

  static noProductSubCategoryHasBeenFound(): never {
    throw new AppError('No product sub category has been found', 400);
  }

  static noProductCategoryHasBeenFound(): never {
    throw new AppError('No Product Category has been found', 400);
  }
}

interface IProductSubCategoryReqData {
  name?: unknown;
  image?: unknown;
  uniqueName?: string; // User by find product sub category
  productCategoryUniqueName?: string; // Find parent product cateogry
}

export default class ProductSubCategoryService {
  private storeName?: string;
  private storeUniqueName?: string;
  private storeImage?: Express.Multer.File;
  private storeProductCategory?: ProductCategoryModel;
  private uniqueName?: string;
  private productCategoryUniqueName?: string;

  private productSubCategory?: ProductSubCategoryModel;
  private productSubCategories?: ProductSubCategoryModel[];

  private updateProductSubCategory?: ProductSubCategoryModel;

  constructor({
    name,
    image,
    uniqueName,
    productCategoryUniqueName,
  }: IProductSubCategoryReqData) {
    if (name && typeof name === 'string') {
      this.storeName = name;
      this.storeUniqueName = simplifyString(name);
    }
    if (image) {
      this.storeImage = image as Express.Multer.File;
    }
    if (uniqueName) {
      this.uniqueName = uniqueName;
    }
    if (productCategoryUniqueName) {
      this.productCategoryUniqueName = productCategoryUniqueName;
    }
  }

  private errorIfNoProducCategoryHasBeenFound() {
    if (!this.storeProductCategory) {
      ClientErrors.noProductCategoryHasBeenFound();
    }
  }

  private async findProductCategory() {
    this.storeProductCategory = await Repositories.productCategory().findOne({
      unique_name: this.productCategoryUniqueName,
    });
    this.errorIfNoProducCategoryHasBeenFound();
  }

  private async findAllProductSubCategories() {
    this.productSubCategories = await Repositories.productSubCategory().find({
      relations: ['product_category'],
    });
  }

  /**
   * Unique name obtained by params
   */
  private async findOneByUniqueName() {
    this.productSubCategory = await Repositories.productSubCategory().findOne({
      where: {
        unique_name: this.uniqueName,
        product_category: this.storeProductCategory,
      },
      relations: ['product_category'],
    });
  }

  /**
   * Unique name obtained by data
   */
  private async findOneByStoreUniqueName() {
    return await Repositories.productSubCategory().findOne({
      where: {
        unique_name: this.storeUniqueName,
        product_category: this.storeProductCategory,
      },
      relations: ['product_category'],
    });
  }

  private errorIfNoProductSubCategoryHasBeenFound() {
    if (!this.productSubCategory) {
      ClientErrors.noProductSubCategoryHasBeenFound();
    }
  }

  private async errorIfProductSubCategoryAlreadyExists() {
    const productSubCategory = await this.findOneByStoreUniqueName();
    if (productSubCategory) {
      ClientErrors.productSubCategoryAlreadyExists();
    }
  }

  private checkImageUpload() {
    if (!this.storeImage) {
      ClientErrors.noFilesUploaded();
    }
  }

  private createInstanceOfProductSubCategory() {
    this.productSubCategory = Repositories.productSubCategory().create({
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
      product_category: this.storeProductCategory,
    });
  }

  private prepareUpdateProductSubCategory() {
    this.updateProductSubCategory = Repositories.productSubCategory().create({
      id: this.productSubCategory?.id,
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
      product_category: this.storeProductCategory,
    });
  }

  private mergeProductSubCategories() {
    if (this.productSubCategory && this.updateProductSubCategory) {
      Repositories.productSubCategory().merge(
        this.productSubCategory,
        this.updateProductSubCategory,
      );
    }
  }

  private async saveProductSubCategoryOnDatabase() {
    if (this.productSubCategory) {
      await Repositories.productSubCategory().save(this.productSubCategory);
    }
  }

  // Public methods

  async index(): Promise<ProductSubCategoryModel[]> {
    await this.findProductCategory();

    await this.findAllProductSubCategories();
    return this.productSubCategories as ProductSubCategoryModel[];
  }

  async show(): Promise<ProductSubCategoryModel> {
    // check product category
    await this.findProductCategory();

    await this.findOneByUniqueName();
    this.errorIfNoProductSubCategoryHasBeenFound();
    return this.productSubCategory as ProductSubCategoryModel;
  }

  async store(): Promise<ProductSubCategoryModel> {
    this.checkImageUpload();

    await this.findProductCategory();

    // Validating data
    await CategorySchema.validateNameSchema(this.storeName);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfProductSubCategoryAlreadyExists();

    this.createInstanceOfProductSubCategory();
    await this.saveProductSubCategoryOnDatabase();
    return this.productSubCategory as ProductSubCategoryModel;
  }

  async delete(): Promise<ProductSubCategoryModel> {
    await this.findProductCategory();

    await this.findOneByUniqueName();
    this.errorIfNoProductSubCategoryHasBeenFound();

    // Removing the image of the deleted item
    if (this.productSubCategory) {
      await removeOneFile(this.productSubCategory?.image);
      await Repositories.productSubCategory().remove(this.productSubCategory);
    }
    return this.productSubCategory as ProductSubCategoryModel;
  }

  async update(): Promise<ProductSubCategoryModel> {
    await this.findProductCategory();

    this.checkImageUpload();

    // Checking if exist
    await this.findOneByUniqueName();
    this.errorIfNoProductSubCategoryHasBeenFound();

    // Old image for delete
    const oldImage = this.productSubCategory?.image as string;

    // Validating data
    await CategorySchema.validateNameSchema(this.storeName);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfProductSubCategoryAlreadyExists();

    // Creating the update instance and merge it with the old product category
    this.prepareUpdateProductSubCategory();
    this.mergeProductSubCategories();

    // Saving, removing the old image and returning the updated product category
    await this.saveProductSubCategoryOnDatabase();
    await removeOneFile(oldImage);
    return this.productSubCategory as ProductSubCategoryModel;
  }

  async removeImageFromUploads(): Promise<void> {
    if (this.storeImage) {
      await removeOneFile(this.storeImage.path);
    }
  }
}
