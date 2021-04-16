import { EntityRepository, Repository } from 'typeorm';
import { ProductSubCategoryKeyword } from '../models/Keywords';

import ProductSubCategory, {
  IProductSubCategory,
} from '../models/ProductSubCategory';

/**
 * Repository for Product Sub Category
 */
@EntityRepository(ProductSubCategory)
export class ProductSubCategoryRepository extends Repository<ProductSubCategory> {
  async createAndSaveProductCategory(
    data: Pick<
      IProductSubCategory,
      'name' | 'unique_name' | 'image' | 'product_category' | 'keywords'
    >,
  ): Promise<ProductSubCategory> {
    const productSubCategory = new ProductSubCategory();

    productSubCategory.name = data.name;
    productSubCategory.unique_name = data.unique_name;
    productSubCategory.image = data.image;
    productSubCategory.product_category = data.product_category;
    productSubCategory.keywords = data.keywords;

    await this.save(productSubCategory);
    return productSubCategory;
  }
}

/**
 * Repository for keywords of product sub category
 */
@EntityRepository(ProductSubCategoryKeyword)
export class ProductSubCategoryKeywordRepository extends Repository<ProductSubCategoryKeyword> {
  createKeyword(keyword: string): ProductSubCategoryKeyword {
    const productSubCategoryKeyword = new ProductSubCategoryKeyword();
    productSubCategoryKeyword.keyword = keyword;
    return productSubCategoryKeyword;
  }
}
