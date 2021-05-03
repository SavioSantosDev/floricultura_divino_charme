import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductSubCategoryModel from './product-sub-category.model';

export interface IProductCategory {
  id: string;
  name: string;
  unique_name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  product_sub_categories: ProductSubCategoryModel[];
}

@Entity('product_categories')
export default class ProductCategoryModel implements IProductCategory {
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
    () => ProductSubCategoryModel,
    (product_sub_categories) => product_sub_categories.product_category,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'product_category_id' })
  product_sub_categories!: ProductSubCategoryModel[];
}
