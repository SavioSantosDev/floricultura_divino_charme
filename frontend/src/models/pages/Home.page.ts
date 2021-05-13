import { ICategory } from './../Category';
import { IProduct } from '../Product';
import { IImage } from '../Image';

export interface IHomePage {
  banner: IBanner;
  benefits: IBenefits;
  categories: ICategories;
  featuredProducts: IFeaturedProducts;
  gallery: IGallery;
}

export interface IBanner {
  title: string;
  content: string;
}

export interface IBenefits {
  title: string;
  subtitle: string;
  cards: BenefitCard[];
}

interface BenefitCard {
  image: string;
  title: string;
  content: string;
}

export interface ICategories {
  title: string;
  subtitle: string;
  categories: ICategory[];
}

export interface IFeaturedProducts {
  title: string;
  subtitle: string;
  products: IProduct[];
}

export interface IGallery {
  title: string;
  subtitle: string;
  images: IImage[];
}
