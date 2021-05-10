import { AppError } from '../errors/app.error';
import { Category } from '../models/Category';
import { SubCategory } from '../models/SubCategory';
import { Repositories } from '../repositories/_custom-repositories';
import { CategorySchema } from '../utils/schemas';
import simplifyString from '../utils/simplify-string';

class ClientErrors {
  static subCategoryAlreadyExists(): never {
    throw new AppError('Sub Category already exist!', 400);
  }

  static noSubCategoryHasBeenFound(): never {
    throw new AppError('No sub category has been found', 400);
  }

  static noCategoryHasBeenFound(): never {
    throw new AppError('No Category has been found', 400);
  }
}

interface ISubCategoryReqData {
  name?: string;
  uniqueName?: string;
  categoryUniqueName?: string;
}

export class SubCategoryService {
  private name?: string;
  private storeUniqueName?: string;
  private reqUniqueName?: string;
  private storeCategory?: Category;
  private categoryUniqueName?: string;

  private subCategory?: SubCategory;
  private subCategories?: SubCategory[];

  private updateSubCategory?: SubCategory;
  private removedSubCategory?: SubCategory;

  constructor({ name, uniqueName, categoryUniqueName }: ISubCategoryReqData) {
    if (name) {
      this.name = name;
      this.storeUniqueName = simplifyString(name);
    }
    if (uniqueName) {
      this.reqUniqueName = uniqueName;
    }
    if (categoryUniqueName) {
      this.categoryUniqueName = categoryUniqueName;
    }
  }

  private errorIfNoCategoryHasBeenFound() {
    if (!this.storeCategory) {
      ClientErrors.noCategoryHasBeenFound();
    }
  }

  private async findOneCategory() {
    this.storeCategory = await Repositories.category().findOne({
      unique_name: this.categoryUniqueName,
    });
    this.errorIfNoCategoryHasBeenFound();
  }

  private async findAll() {
    this.subCategories = await Repositories.subCategory().find({
      relations: ['category'],
    });
  }

  private async findOneByUniqueName() {
    this.subCategory = await Repositories.subCategory().findOne({
      where: {
        unique_name: this.reqUniqueName,
        category: this.storeCategory,
      },
      relations: ['category'],
    });
  }

  private errorIfNoSubCategoryHasBeenFound() {
    if (!this.subCategory) {
      ClientErrors.noSubCategoryHasBeenFound();
    }
  }

  private async errorIfSubCategoryAlreadyExists() {
    const subCategory = await Repositories.subCategory().findOne({
      where: {
        unique_name: this.storeUniqueName,
        category: this.storeCategory,
      },
    });
    if (subCategory) {
      ClientErrors.subCategoryAlreadyExists();
    }
  }

  private createSubCategoryInstance() {
    this.subCategory = Repositories.subCategory().create({
      name: this.name,
      unique_name: this.storeUniqueName,
      category: this.storeCategory,
    });
  }

  private createUpdateSubCategoryInstance() {
    this.updateSubCategory = Repositories.subCategory().create({
      id: this.subCategory?.id,
      name: this.name,
      unique_name: this.storeUniqueName,
      category: this.storeCategory,
    });
  }

  private mergeSubCategories() {
    if (this.subCategory && this.updateSubCategory) {
      Repositories.subCategory().merge(
        this.subCategory,
        this.updateSubCategory,
      );
    }
  }

  private async saveOnDataBase() {
    if (this.subCategory) {
      await Repositories.subCategory().save(this.subCategory);
    }
  }

  private async removeSubCategory() {
    if (this.subCategory) {
      this.removedSubCategory = await Repositories.subCategory().remove(
        this.subCategory,
      );
    }
  }

  // Public methods

  async index(): Promise<SubCategory[] | undefined> {
    await this.findOneCategory();

    await this.findAll();
    return this.subCategories;
  }

  async show(): Promise<SubCategory | undefined> {
    await this.findOneCategory();

    await this.findOneByUniqueName();
    this.errorIfNoSubCategoryHasBeenFound();
    return this.subCategory;
  }

  async store(): Promise<SubCategory | undefined> {
    await this.findOneCategory();

    await CategorySchema.validateNameSchema(this.name);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfSubCategoryAlreadyExists();

    this.createSubCategoryInstance();
    await this.saveOnDataBase();
    return this.subCategory;
  }

  async update(): Promise<SubCategory | undefined> {
    await this.findOneCategory();

    // Checking if exist
    await this.findOneByUniqueName();
    this.errorIfNoSubCategoryHasBeenFound();

    // Validating data
    await CategorySchema.validateNameSchema(this.name);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfSubCategoryAlreadyExists();

    // Creating the update instance and merge it with the old  category
    this.createUpdateSubCategoryInstance();
    this.mergeSubCategories();

    // Saving, removing the old image and returning the updated  category
    await this.saveOnDataBase();
    return this.subCategory;
  }

  async delete(): Promise<SubCategory | undefined> {
    await this.findOneCategory();

    await this.findOneByUniqueName();
    this.errorIfNoSubCategoryHasBeenFound();

    await this.removeSubCategory();
    return this.removedSubCategory;
  }
}
