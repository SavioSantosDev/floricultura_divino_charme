import { EntityRepository, Repository } from 'typeorm';
import ProductModel from '../models/product.model';

@EntityRepository(ProductModel)
export class ProductRepository extends Repository<ProductModel> {}
