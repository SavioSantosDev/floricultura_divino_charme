export interface StoreInformation {
  emails: string[];
  phones: string[];
  social: Social;
  locations: GeoLocation[];
}


export interface Social {
  instagram: string;
}


export interface GeoLocation {
  city: string;
  uf: string;
  address: string;
  lat: number;
  lng: number;
}
