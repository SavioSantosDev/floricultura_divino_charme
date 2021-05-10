import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IProduct {
  id: string;
  name: string;
  unique_name: string;
  value: number;
  description: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  unique_name!: string;

  @Column()
  value!: number;

  @Column()
  description!: string;

  @Column()
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
