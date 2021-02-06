import { Component,  OnInit, Input } from '@angular/core';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';
import { PageHomeSGallery } from 'src/models/PageHomeSGallery';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss', '../../../shared/scss/gallery.scss']
})
export class GalleryPreviewComponent implements OnInit {

  @Input() sGallery?: PageHomeSGallery;

  images: Image[][] = []; // As imagens que serão visualizadas no template
  modalImagePath = '';    // A imagem que será visualizada na modal
  modalImageName = '';    // O nome da imagem que será visualizada na modal

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    const galleryImages = this.sGallery?.images;
    if (galleryImages) {
      this.images = this.galleryService.groupImages(galleryImages, 3);
    }
  }

}
