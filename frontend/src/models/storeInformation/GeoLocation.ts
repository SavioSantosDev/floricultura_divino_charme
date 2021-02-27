/**
 * Dados de geocalização das lojas
 */
export interface GeoLocation {
  city: string;     // Cidade
  uf: string;       // Estado
  address: string;  // Endereço: Rua número bairro...
  lat: number;      // Latitude
  lng: number;      // Longitude
}
