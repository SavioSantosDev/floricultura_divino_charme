import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { Photo } from 'src/models/Photo';
import { GalleryPage } from 'src/models/Pages';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: Photo[] = [];
  pageGallery: GalleryPage;

  list = 1; // Será utilizado para requisitar as imagens em listas

  constructor(
    route: ActivatedRoute,
    private photoService: PhotosService
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
    if (this.photoService.getHasMorePhotos()) {
      this.list ++;
      this.requestImages();
    }
  }


  requestImages(): void {
    this.photoService.list(this.list).pipe(
      take(1)
    )
    .subscribe(images => {
      this.galleryImages = this.galleryImages.concat(images);
    });
  }


}
