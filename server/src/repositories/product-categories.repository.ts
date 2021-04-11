import { EntityRepository, Repository } from 'typeorm';
import ProductCategory, { IProductCategory } from '../models/ProductCategory';
import ProductCategoryKeyword from '../models/ProductCategoryKeyword';

/**
 * Repository for Product Category
 */
@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  async createAndSaveProductCategory(
    data: Pick<IProductCategory, 'name' | 'unique_name' | 'image' | 'keywords'>,
  ): Promise<ProductCategory> {
    const productCategory = new ProductCategory();

    productCategory.name = data.name;
    productCategory.unique_name = data.unique_name;
    productCategory.image = data.image;
    productCategory.keywords = data.keywords;

    await this.save(productCategory);
    return productCategory;
  }
}

/**
 * Repository for keywords of product category
 */
@EntityRepository(ProductCategoryKeyword)
export class ProductCategoryKeywordRepository extends Repository<ProductCategoryKeyword> {
  createProductCategoryKeyword(keyword: string): ProductCategoryKeyword {
    const productSubCategory = new ProductCategoryKeyword();
    productSubCategory.keyword = keyword;
    return productSubCategory;
  }
}
