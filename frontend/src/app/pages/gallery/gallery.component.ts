import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';
import { PageGallery } from 'src/models/PageGallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss', '../../shared/scss/gallery.scss' ]
})
export class GalleryComponent implements OnInit {

  private galleryImages: Image[];   // Imagens da galeria. Recebidas via Resolve;
  pageGallery: PageGallery;         // Conteúdo da página. Via resolver tmb.

  images: Image[][];  // As imagens que serão visualizadas no template
  modalImagePath = '';    // A imagem que será visualizada na modal
  modalImageName = '';    // O nome da imagem que será visualizada na modal

  constructor(
    route: ActivatedRoute,
    galleryService: GalleryService
  ) {
    // Pegando os dados resolvidos
    this.galleryImages = route.snapshot.data.images;
    this.pageGallery = route.snapshot.data.pageGallery;

    // Agrupando a imagem em um array com subarrays de 3 imagens;
    this.images = galleryService.groupImages(this.galleryImages, 3);
  }

  ngOnInit(): void {
  }

}
