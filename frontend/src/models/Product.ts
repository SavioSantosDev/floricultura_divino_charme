import { ProductCategory } from './ProductCategory';

// Interface para cada produto da loja

export interface Product {
  name: string;               // Nome do produto
  description: string;        // Uma descrição
  category: ProductCategory;  // Categoria a que pertence este produto
  images: string[];           // Algumas imagens deste produto
}
