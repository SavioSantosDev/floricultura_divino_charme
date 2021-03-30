export interface Product {
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
}

export interface ProductCategory {
  image: string;
  category: string;
}

