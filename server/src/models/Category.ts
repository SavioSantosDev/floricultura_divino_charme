import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategory } from './SubCategory';

export interface ICategory {
  id: string;
  name: string;
  unique_name: string;
  created_at: Date;
  updated_at: Date;
  sub_categories: SubCategory[];
}

@Entity('categories')
export class Category implements ICategory {
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

  @OneToMany(() => SubCategory, (sub_categories) => sub_categories.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'category_id' })
  sub_categories!: SubCategory[];
}
