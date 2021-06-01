import { IImage } from './Image';
import { IProduct } from './Product';

export interface ICategory {
  // id: string;
  name: string;
  image: IImage;
  featuredProduct: IProduct;
  subCategories: string[];
  productSuggestions: string[];
  // created_at: string;
  // updated_at: string;
}
