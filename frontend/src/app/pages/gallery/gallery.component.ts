import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { IImage } from 'src/models/Image';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images: IImage[] = [];

  list = 1; // Será utilizado para requisitar as imagens em listas

  constructor(
    private imagesService: ImagesService
  ) {
  }


  ngOnInit(): void {
    this.requestImages();
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
      this.images.push(...images);
    });
  }


}
