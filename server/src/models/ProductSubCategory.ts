import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductSubCategoryKeyword } from './Keywords';
import ProductCategory from './ProductCategory';

export interface IProductSubCategory {
  id: string;
  name: string;
  unique_name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  product_category: ProductCategory;
  keywords: ProductSubCategoryKeyword[];
}

@Entity('product_sub_categories')
export default class ProductSubCategory implements IProductSubCategory {
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
    () => ProductCategory,
    (product_category) => product_category.product_sub_categories,
  )
  @JoinColumn({ name: 'product_category_id' })
  product_category!: ProductCategory;

  @OneToMany(
    () => ProductSubCategoryKeyword,
    (keyword) => keyword.product_sub_category,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_sub_category_id' })
  keywords!: ProductSubCategoryKeyword[];
}
