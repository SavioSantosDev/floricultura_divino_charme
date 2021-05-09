import { getCustomRepository } from 'typeorm';

import { ProductCategoryRepository } from '../repositories/product-categories.repository';
import { ProductSubCategoryRepository } from '../repositories/product-sub-categories.repository';
import { ProductRepository } from '../repositories/product.repository';

export default class Repositories {
  static productCategory(): ProductCategoryRepository {
    return getCustomRepository(ProductCategoryRepository);
  }

  static productSubCategory(): ProductSubCategoryRepository {
    return getCustomRepository(ProductSubCategoryRepository);
  }

  static product(): ProductRepository {
    return getCustomRepository(ProductRepository);
  }
}
