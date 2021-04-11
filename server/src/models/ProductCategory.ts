import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductCategoryKeyword from './ProductCategoryKeyword';
// import ProductSubCategory from './ProductSubCategory';

export interface IProductCategory {
  id: string;
  name: string;
  unique_name: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  keywords: ProductCategoryKeyword[];
  // sub_categories: ProductSubCategory[];
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
    () => ProductCategoryKeyword,
    (keyword) => keyword.product_category,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn({ name: 'product_category_id' })
  keywords!: ProductCategoryKeyword[];

  // @OneToMany(
  //   () => ProductSubCategory,
  //   (sub_category) => sub_category.product_category,
  //   {
  //     cascade: ['insert', 'update'],
  //   },
  // )
  // @JoinColumn({ name: 'product_category_id' })
  // sub_categories!: ProductSubCategory[];
}
