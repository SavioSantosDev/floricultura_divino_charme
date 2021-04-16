import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategoryKeyword } from './Keywords';
import ProductSubCategory from './ProductSubCategory';

export interface IProductCategory {
  id: string;
  name: string;
  unique_name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  keywords: ProductCategoryKeyword[];
  product_sub_categories: ProductSubCategory[];
}

@Entity('product_categories')
export default class ProductCategory implements IProductCategory {
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

  @OneToMany(
    () => ProductSubCategory,
    (product_sub_categories) => product_sub_categories.product_category,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_category_id' })
  product_sub_categories!: ProductSubCategory[];

  @OneToMany(
    () => ProductCategoryKeyword,
    (keyword) => keyword.product_category,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_category_id' })
  keywords!: ProductCategoryKeyword[];
}
