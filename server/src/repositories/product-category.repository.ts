import { EntityRepository, Repository } from 'typeorm';
import ProductCategory, { IProductCategory } from '../models/ProductCategory';

@EntityRepository(ProductCategory)
export default class ProductCategoryRepository extends Repository<ProductCategory> {
  async createAndSaveProductCategory(
    data: Pick<
      IProductCategory,
      'name' | 'unique_name' | 'image' | 'sub_categories'
    >,
  ): Promise<ProductCategory> {
    const productCategory = new ProductCategory();

    productCategory.name = data.name;
    productCategory.unique_name = data.unique_name;
    productCategory.image = data.image;
    productCategory.sub_categories = data.sub_categories;

    await this.save(productCategory);
    return productCategory;
  }
}
