import { EntityRepository, Repository } from 'typeorm';
import ProductCategoryModel from '../models/product-category.model';

/**
 * Repository for Product Category
 */
@EntityRepository(ProductCategoryModel)
export class ProductCategoryRepository extends Repository<ProductCategoryModel> {}
