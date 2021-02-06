import { Image } from './Image';
import { SectionHeader } from './SectionHeader';

// Sessão que mostrar algumas imagens da galeria
export interface PageHomeSGallery extends SectionHeader {
  images: Image[];
}
