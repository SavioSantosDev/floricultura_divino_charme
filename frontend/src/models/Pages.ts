import { Product, ProductCategory } from './Product';
import { Photo } from './Photo';


////////////////////////////////////// Pages


export interface HomePage {
  banner: HomePageBanner;
  benefits: HomePageBenefits;
  products: HomePageProducts;
  featuredProducts: HomePageFeaturedProducts;
  gallery: HomePageGallery;
}

export interface HomePageBanner {
  title: string;
  content: string;
}

interface SectionHeader {
  title: string;
  subtitle: string;
}

export interface HomePageBenefits extends SectionHeader {
  cards: BenefitCard[];
}

interface BenefitCard {
  image: string;
  title: string;
  content: string;
}

export interface HomePageFeaturedProducts extends SectionHeader {
  products: Product[];
}

export interface HomePageGallery extends SectionHeader {
  images: Photo[];
}

export interface HomePageProducts extends SectionHeader {
  products: ProductCategory[];
}

//////////////////////////////////////

export interface AboutPage {
  title: string;
  content: string;
  image: string;
}

//////////////////////////////////////

export interface ContactPage {
  title: string;
  content: string;
}

//////////////////////////////////////

export interface GalleryPage {
  title: string;
  content: string;
  info: string;
}


