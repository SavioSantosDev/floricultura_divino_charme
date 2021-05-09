import { AppError } from '../errors/app.error';
import ProductCategoryModel from '../models/product-category.model';
import Repositories from '../utils/custom-repositories';
import { removeOneFile } from '../utils/manage-files';
import { CategorySchema } from '../utils/schemas';
import simplifyString from '../utils/simplify-string';

class ClientErrors {
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

interface IProductCategoryReqData {
  name?: unknown;
  image?: unknown;
  uniqueName?: string;
}

export default class ProductCategoryService {
  private storeName?: string;
  private storeUniqueName?: string;
  private storeImage?: Express.Multer.File;
  private uniqueName?: string;
  private productCategory?: ProductCategoryModel;
  private productCategories?: ProductCategoryModel[];

  private updateProductCategory?: ProductCategoryModel;

  constructor({ name, image, uniqueName }: IProductCategoryReqData) {
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
  }

  private async findAllProductCategories() {
    this.productCategories = await Repositories.productCategory().find({
      relations: ['product_sub_categories'],
    });
  }

  /**
   * Unique name obtained by params
   */
  private async findOneByUniqueName() {
    this.productCategory = await Repositories.productCategory().findOne({
      where: { unique_name: this.uniqueName },
      relations: ['product_sub_categories'],
    });
  }

  /**
   * Unique name obtained by data
   */
  private async findOneByStoreUniqueName() {
    return await Repositories.productCategory().findOne({
      where: { unique_name: this.storeUniqueName },
    });
  }

  private errorIfNoProductCategoryHasBeenFound() {
    if (!this.productCategory) {
      ClientErrors.noProductCategoriesHasBeenFound();
    }
  }

  private async errorIfProductCategoryAlreadyExists() {
    const productCategory = await this.findOneByStoreUniqueName();
    if (productCategory) {
      ClientErrors.productCategoryAlreadyExists();
    }
  }

  private checkImageUpload() {
    if (!this.storeImage) {
      ClientErrors.noFilesUploaded();
    }
  }

  private createInstanceOfProductCategory() {
    this.productCategory = Repositories.productCategory().create({
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
    });
  }

  private prepareUpdateProductCategory() {
    this.updateProductCategory = Repositories.productCategory().create({
      id: this.productCategory?.id,
      name: this.storeName,
      unique_name: this.storeUniqueName,
      image: this.storeImage?.path,
    });
  }

  private mergeProductCategories() {
    if (this.productCategory && this.updateProductCategory) {
      Repositories.productCategory().merge(
        this.productCategory,
        this.updateProductCategory,
      );
    }
  }

  private async saveProductCategoryOnDatabase() {
    if (this.productCategory) {
      await Repositories.productCategory().save(this.productCategory);
    }
  }

  // Public methods

  async index(): Promise<ProductCategoryModel[]> {
    await this.findAllProductCategories();
    return this.productCategories as ProductCategoryModel[];
  }

  async show(): Promise<ProductCategoryModel> {
    await this.findOneByUniqueName();
    this.errorIfNoProductCategoryHasBeenFound();
    return this.productCategory as ProductCategoryModel;
  }

  async store(): Promise<ProductCategoryModel> {
    this.checkImageUpload();

    // Validating data
    await CategorySchema.validateNameSchema(this.storeName);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfProductCategoryAlreadyExists();

    this.createInstanceOfProductCategory();
    await this.saveProductCategoryOnDatabase();
    return this.productCategory as ProductCategoryModel;
  }

  async update(): Promise<ProductCategoryModel> {
    this.checkImageUpload();

    // Checking if exist
    await this.findOneByUniqueName();
    this.errorIfNoProductCategoryHasBeenFound();

    // Old image for delete
    const oldImage = this.productCategory?.image as string;

    // Validating data
    await CategorySchema.validateNameSchema(this.storeName);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfProductCategoryAlreadyExists();

    this.prepareUpdateProductCategory();
    this.mergeProductCategories();

    await this.saveProductCategoryOnDatabase();
    await removeOneFile(oldImage);
    return this.productCategory as ProductCategoryModel;
  }

  async delete(): Promise<ProductCategoryModel> {
    await this.findOneByUniqueName();
    this.errorIfNoProductCategoryHasBeenFound();

    // Removing the image of the deleted item
    if (this.productCategory) {
      await removeOneFile(this.productCategory?.image);
      await Repositories.productCategory().remove(this.productCategory);
    }
    return this.productCategory as ProductCategoryModel;
  }

  async removeImageFromUploads(): Promise<
    true | NodeJS.ErrnoException[] | void
  > {
    if (this.storeImage) {
      await removeOneFile(this.storeImage.path);
    }
  }
}
