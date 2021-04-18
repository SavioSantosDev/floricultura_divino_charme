import { getCustomRepository } from 'typeorm';

import { ProductCategoryRepository } from './product-categories.repository';
import { ProductSubCategoryRepository } from './product-sub-categories.repository';

export default class Repositories {
  static productCategory(): ProductCategoryRepository {
    return getCustomRepository(ProductCategoryRepository);
  }

  static productSubCategory(): ProductSubCategoryRepository {
    return getCustomRepository(ProductSubCategoryRepository);
  }
}
