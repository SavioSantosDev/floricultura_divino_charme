import { AppError } from '../errors/app.error';
import { Category } from '../models/Category';
import { Repositories } from '../repositories/_custom-repositories';
import { CategorySchema } from '../utils/schemas';
import simplifyString from '../utils/simplify-string';

class ClientErrors {
  static categoryAlreadyExists(): never {
    throw new AppError('Category already exist!', 400);
  }

  static noCategoryHasBeenFound(): never {
    throw new AppError('No product category has been found', 400);
  }
}

interface ICategoryReqData {
  name?: string;
  uniqueName?: string;
}

export class CategoryService {
  private name?: string;
  private storeUniqueName?: string;
  private reqUniqueName?: string;
  private category?: Category;
  private categories?: Category[];

  private updateCategory?: Category;
  private removedCategory?: Category;

  constructor({ name, uniqueName }: ICategoryReqData) {
    if (name) {
      this.name = name;
      this.storeUniqueName = simplifyString(name);
    }
    if (uniqueName) {
      this.reqUniqueName = uniqueName;
    }
  }

  private async findAll() {
    this.categories = await Repositories.category().find({
      relations: ['sub_categories'],
    });
  }

  private async findOneByUniqueName() {
    this.category = await Repositories.category().findOne({
      where: { unique_name: this.reqUniqueName },
      relations: ['sub_categories'],
    });
  }

  private errorIfNoCategoryHasBeenFound() {
    if (!this.category) {
      ClientErrors.noCategoryHasBeenFound();
    }
  }

  private async errorIfCategoryAlreadyExists() {
    const category = await Repositories.category().findOne({
      where: { unique_name: this.storeUniqueName },
    });
    if (category) {
      ClientErrors.categoryAlreadyExists();
    }
  }

  private createCategoryInstance() {
    this.category = Repositories.category().create({
      name: this.name,
      unique_name: this.storeUniqueName,
    });
  }

  private createUpdateCategoryInstance() {
    this.updateCategory = Repositories.category().create({
      id: this.category?.id,
      name: this.name,
      unique_name: this.storeUniqueName,
    });
  }

  private mergeCategories() {
    if (this.category && this.updateCategory) {
      Repositories.category().merge(this.category, this.updateCategory);
    }
  }

  private async saveOnDataBase() {
    if (this.category) {
      await Repositories.category().save(this.category);
    }
  }

  private async removeCategory() {
    if (this.category) {
      this.removedCategory = await Repositories.category().remove(
        this.category,
      );
    }
  }

  // Public methods

  async index(): Promise<Category[] | undefined> {
    await this.findAll();
    return this.categories;
  }

  async show(): Promise<Category | undefined> {
    await this.findOneByUniqueName();
    this.errorIfNoCategoryHasBeenFound();
    return this.category;
  }

  async store(): Promise<Category | undefined> {
    await CategorySchema.validateNameSchema(this.name);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfCategoryAlreadyExists();

    this.createCategoryInstance();
    await this.saveOnDataBase();
    return this.category;
  }

  async update(): Promise<Category | undefined> {
    await this.findOneByUniqueName();
    this.errorIfNoCategoryHasBeenFound();

    // Validating data
    await CategorySchema.validateNameSchema(this.name);
    await CategorySchema.validateNameSchema(this.storeUniqueName);

    await this.errorIfCategoryAlreadyExists();

    this.createUpdateCategoryInstance();
    this.mergeCategories();

    await this.saveOnDataBase();
    return this.category;
  }

  async delete(): Promise<Category | undefined> {
    await this.findOneByUniqueName();
    this.errorIfNoCategoryHasBeenFound();

    await this.removeCategory();

    return this.removedCategory;
  }
}
