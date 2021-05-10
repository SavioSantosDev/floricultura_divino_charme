import { getCustomRepository } from 'typeorm';

import { CategoryRepository } from './category.repository';
import { SubCategoryRepository } from './sub-category.repository';
import { ProductRepository } from './product.repository';

export class Repositories {
  static category(): CategoryRepository {
    return getCustomRepository(CategoryRepository);
  }

  static subCategory(): SubCategoryRepository {
    return getCustomRepository(SubCategoryRepository);
  }

  static product(): ProductRepository {
    return getCustomRepository(ProductRepository);
  }
}
