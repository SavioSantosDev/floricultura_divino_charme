import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';

export interface ISubCategory {
  id: string;
  name: string;
  unique_name: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
}

@Entity('sub_categories')
export class SubCategory implements ISubCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
  })
  name!: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  unique_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Category, (category) => category.sub_categories)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
