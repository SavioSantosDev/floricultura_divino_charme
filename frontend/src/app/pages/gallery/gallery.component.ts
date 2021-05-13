import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { IImage } from 'src/models/Image';
import { IGalleryPage } from 'src/models/pages/Gallery.page';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: IImage[] = [];
  galleryPage: IGalleryPage;

  list = 1; // Será utilizado para requisitar as imagens em listas

  constructor(
    route: ActivatedRoute,
    private imagesService: ImagesService
  ) {
    this.galleryPage = route.snapshot.data.galleryPage; // Pegando os dados resolvidos
  }


  ngOnInit(): void {
    this.requestImages(); // A primeira requisição das imagens
  }


  /**
   * Enquanto houver imagens, requisita-las ao atingir a borda inferior da galeria
   */
  onIntersecting(): void {
    if (this.imagesService.getHasMorePhotos()) {
      this.list ++;
      this.requestImages();
    }
  }


  requestImages(): void {
    this.imagesService.list(this.list).pipe(
      take(1)
    )
    .subscribe(images => {
      this.galleryImages = this.galleryImages.concat(images);
    });
  }


}
