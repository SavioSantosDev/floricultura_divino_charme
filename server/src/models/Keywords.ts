import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory from './ProductCategory';
import ProductSubCategory from './ProductSubCategory';

/**
 * Entity for Product Categories Keywords
 */

export interface IProductCategoryKeyword {
  id: string;
  keyword: string;
  product_category: ProductCategory;
}

@Entity('product_categories_keywords')
export class ProductCategoryKeyword implements IProductCategoryKeyword {
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

/**
 * Entity for Product Sub Categories Keywords
 */

export interface IProductSubCategoryKeyword {
  id: string;
  keyword: string;
  product_sub_category: ProductSubCategory;
}

@Entity('product_sub_categories_keywords')
export class ProductSubCategoryKeyword implements IProductSubCategoryKeyword {
  @PrimaryGeneratedColumn('increment')
  id!: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  keyword!: string;

  @ManyToOne(
    () => ProductSubCategory,
    (product_sub_category) => product_sub_category.keywords,
  )
  @JoinColumn({ name: 'product_sub_category_id' })
  product_sub_category!: ProductSubCategory;
}
