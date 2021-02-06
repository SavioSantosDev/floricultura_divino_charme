import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Image } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private readonly PATH = `${environment.API}gallery.json`;

  constructor(private http: HttpClient) { }

  /**
   * Listar todas as imagens da galeria
   */
  list(): Observable<Image[]> {
    return this.http.get<Image[]>(this.PATH);
  }


  /**
   * Agrupar o array de imagens em subarrays para exibir em 'linhas' de imagens no template
   * @param images      O array inteiro das imagens
   * @param rowsLength  Quantas imagens o subarray / linha deverá conter
   */
  groupImages(images: Image[], rowsLength: number): Image[][] {
    const matriz: Image[][] = [];   // A matriz que será retornada
    let row: Image[] = [];          // Uma 'linha' da matriz contendo rowsLength imagens

    // Percorrer todas as imagens
    images.forEach((image: Image, index: number) => {

      // Quando o subarray tiver a quantidade especificada, adiciona-lo à matriz
      if (index !== 0 && index % rowsLength === 0) {
        matriz.push(row);
        row = [];
      }

      row.push(image);  // Adicionar uma imagem ao subarray

      // Quando chegar no final do array, adicionar as imagens restantes na matriz
      if (index === images.length - 1) {
        matriz.push(row);
      }
    });

    return matriz; // Retornar a matriz
  }
}
