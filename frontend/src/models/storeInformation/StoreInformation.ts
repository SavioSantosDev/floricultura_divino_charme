import { GeoLocation } from './GeoLocation';
import { Social } from './Social';

/**
 * Informações 'pessoais' da loja para contato
 */
export interface StoreInformation {
  emails: string[]; // E-mails para contato
  phones: string[]; // Telefone para contato
  social: Social;   // Redes sociais
  locations: GeoLocation[];
}

