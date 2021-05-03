import { EntityRepository, Repository } from 'typeorm';

import ProductSubCategoryModel from '../models/product-sub-category.model';

@EntityRepository(ProductSubCategoryModel)
export class ProductSubCategoryRepository extends Repository<ProductSubCategoryModel> {}
