import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory from './ProductCategory';

export interface IProductCategoryKeyword {
  id: string;
  keyword: string;
  product_category: ProductCategory;
}

@Entity('product_categories_keywords')
export default class ProductCategoryKeyword implements IProductCategoryKeyword {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  keyword!: string;

  @ManyToOne(
    () => ProductCategory,
    (product_category) => product_category.keywords,
  )
  @JoinColumn({ name: 'product_category_id' })
  product_category!: ProductCategory;
}
