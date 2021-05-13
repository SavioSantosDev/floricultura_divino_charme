import { ICategory } from './Category';

export interface IProduct {
  // id: string;
  name: string;
  unique_name: string;
  value: number;
  code: string;
  description: string;
  // active: boolean;
  category: ICategory;
  images: string[];
}
