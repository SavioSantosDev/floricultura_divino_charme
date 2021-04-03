import { IProductSubCategory } from './../models/ProductSubCategory';
import { EntityRepository, Repository } from 'typeorm';
import ProductSubCategory from '../models/ProductSubCategory';

@EntityRepository(ProductSubCategory)
export default class ProductSubCategoryRepository extends Repository<ProductSubCategory> {
  createProductSubCategory(
    data: Pick<IProductSubCategory, 'name' | 'unique_name'>,
  ): ProductSubCategory {
    const productSubCategory = new ProductSubCategory();
    productSubCategory.name = data.name;
    productSubCategory.unique_name = data.unique_name;
    return productSubCategory;
  }
}
