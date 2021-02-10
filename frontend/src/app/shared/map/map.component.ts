import { Component, OnInit, Input } from '@angular/core';
import { Map, latLng, MapOptions, Marker, tileLayer, icon, marker, Icon } from 'leaflet';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // Será inicializado por padrão com as coordenadas de botuporã

  @Input() mapLng = -13.37814226233769;
  @Input() mapLat = -42.52245825526236;
  @Input() mapZoom = 15;
  @Input() popupText = 'Floricultura divino charme';

  // O mapa, suas configurações e um marcador
  map?: Map;
  options: MapOptions = {};
  mapMarker = new Marker([ 0, 0 ]);

  // O ícone que vai ser utilizado como marcador
  markerIcon = new Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
  });

  // A textura padrão e a outra do mapbox;
  // mapTexture = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  mapTexture = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${environment.MAPBOX_TOKEN}`;


  ngOnInit(): void {
    this.setMapOptions(); // setar as conf. do mapa quando o componente for iniciado
  }


  /**
   * Definir as configurações que o mapa irá utilizar
   */
  setMapOptions(): void {
    this.options = {
      center: latLng(this.mapLat, this.mapLng),
      zoom: this.mapZoom,
      layers: [
        tileLayer( this.mapTexture, { maxZoom: 19 } )
      ]
    };
  }


  /**
   * Inicializa um marcador (na vdd vai apenas reedefinir as coordenadas) e adiciona-o ao mapa
   */
  initializeMarker(): void {
    if (this.map) {
      this.mapMarker.setLatLng([this.mapLat, this.mapLng]);
      this.mapMarker.setIcon(this.markerIcon);
      this.mapMarker.addTo(this.map);
      this.mapMarker.bindPopup(this.mapPopup());
    }
  }


  // A popup que será exibida quando clicar sobre o marcador
  mapPopup(): string {
    return `<strong>${this.popupText}</strong>`;
  }


  /**
   * Função chamada no template quando o mapa estiver pronto.
   */
  onMapReady(map: Map): void {
    this.map = map;
    this.initializeMarker();
  }
}
