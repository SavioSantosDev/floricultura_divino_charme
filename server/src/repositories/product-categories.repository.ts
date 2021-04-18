import { EntityRepository, Repository } from 'typeorm';
import ProductCategory from '../models/ProductCategory';

/**
 * Repository for Product Category
 */
@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {}
