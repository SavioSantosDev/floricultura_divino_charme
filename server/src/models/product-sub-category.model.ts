import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductCategoryModel from './product-category.model';

export interface IProductSubCategory {
  id: string;
  name: string;
  unique_name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  product_category: ProductCategoryModel;
}

@Entity('product_sub_categories')
export default class ProductSubCategoryModel implements IProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  unique_name!: string;

  @Column('varchar')
  image!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(
    () => ProductCategoryModel,
    (product_category) => product_category.product_sub_categories,
  )
  @JoinColumn({ name: 'product_category_id' })
  product_category!: ProductCategoryModel;
}
