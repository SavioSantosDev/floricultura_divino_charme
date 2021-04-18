import { EntityRepository, Repository } from 'typeorm';

import ProductSubCategory from '../models/ProductSubCategory';

@EntityRepository(ProductSubCategory)
export class ProductSubCategoryRepository extends Repository<ProductSubCategory> {}
