// Sessão de produtos ofertados na página home

import { ProductCategory } from './ProductCategory';
import { SectionHeader } from './SectionHeader';

export interface PageHomeSProducts extends SectionHeader {
  products: ProductCategory[];
}
