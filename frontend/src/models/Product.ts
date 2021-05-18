import { ICategory } from './Category';
import { IImage } from './Image';
import { ISubCategory } from './SubCategory';

export interface IProduct {
  // id: string;
  name: string;
  unique_name: string;
  price: number;
  code: string;
  description: string;
  // active: boolean;
  category: ICategory;
  subCategory: ISubCategory;
  images: IImage[];
}
