// Página home divida nas sessões abaixo. "s" de section :)

import { PageHomeSBanner } from './PageHomeSBanner';
import { PageHomeSBenefits } from './PageHomeSBenefits';
import { PageHomeSProducts } from './PageHomeSProducts';
import { PageHomeSFeaturedProducts } from './PageHomeSFeaturedProducts';
import { PageHomeSGallery } from './PageHomeSGallery';

export interface PageHome {
  sBanner: PageHomeSBanner;
  sBenefits: PageHomeSBenefits;
  sProducts: PageHomeSProducts;
  sFeaturedProducts: PageHomeSFeaturedProducts;
  sGallery: PageHomeSGallery;
}









