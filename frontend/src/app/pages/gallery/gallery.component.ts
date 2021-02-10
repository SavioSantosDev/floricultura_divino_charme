import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';
import { PageGallery } from 'src/models/PageGallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: Image[] = [];  // As imagens da galeria
  pageGallery: PageGallery;     // Conteúdo da página. Via resolver tmb.

  list = 1; // Será utilizado para requisitar as imagens em listas

  constructor(
    route: ActivatedRoute,
    private galleryService: GalleryService
  ) {
    this.pageGallery = route.snapshot.data.pageGallery; // Pegando os dados resolvidos
  }


  ngOnInit(): void {
    this.requestImages(); // A primeira requisição das imagens
  }


  /**
   * Enquanto houver imagens, requisita-las ao atingir a borda inferior da galeria
   */
  onIntersecting(): void {
    if (this.galleryService.getHasMoreImages()) {
      this.list ++;
      this.requestImages();
    }
  }


  /**
   * Requisitar as imagens através do serviço
   */
  requestImages(): void {
    this.galleryService.list(this.list)
      .pipe(
        take(1)
      )
      .subscribe(images => {
        this.galleryImages = this.galleryImages.concat(images);
      });
  }


}
