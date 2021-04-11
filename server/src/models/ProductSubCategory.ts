// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import ProductCategory from './ProductCategory';

// export interface IProductSubCategory {
//   id: string;
//   name: string;
//   unique_name: string;
//   product_category: ProductCategory;
// }

// @Entity('product_sub_categories')
// export default class ProductSubCategory implements IProductSubCategory {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column({
//     type: 'varchar',
//     length: 20,
//   })
//   name!: string;

//   @Column({
//     type: 'varchar',
//     length: 20,
//     unique: true,
//   })
//   unique_name!: string;

//   // @ManyToOne(
//   //   () => ProductCategory,
//   //   (product_category) => product_category.sub_categories,
//   // )
//   // @JoinColumn({ name: 'product_category_id' })
//   // product_category!: ProductCategory;
// }
