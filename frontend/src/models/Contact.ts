// Informações de contato da loja
export interface Contact {
  info: Info;
  locations: Location[];
}


// Meios de o usuário entrar em contato
interface Info {
  emails: string[]; // E-mails para contato
  phones: string[]; // Telefone para contato
  social: Social;   // Redes sociais
}


// Redes sociais da loja (por enquanto só instagram)
interface Social {
  instagram?: string;   // @algumaCoisa
}


// Localização da loja
interface Location {
  city: string;     // Cidade
  uf: string;       // Estado
  address: string;  // Endereço: Rua número bairro...
  lat: number;      // Latitude
  lng: number;      // Longitude
}
