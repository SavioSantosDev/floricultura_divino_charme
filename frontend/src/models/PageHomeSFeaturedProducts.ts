import { Product } from './Product';
import { SectionHeader } from './SectionHeader';

// Sessão de produtos em destaque da página home
export interface PageHomeSFeaturedProducts extends SectionHeader {
  products: Product[];  // Os produtos em destaque
}
