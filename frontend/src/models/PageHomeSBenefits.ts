import { SectionHeader } from './SectionHeader';

// Sessão de benefícios da página home
export interface PageHomeSBenefits extends SectionHeader {
  cards: BenefitCard[];
}

// Card com um benefício específico
interface BenefitCard {
  image: string;
  title: string;
  content: string;
}
