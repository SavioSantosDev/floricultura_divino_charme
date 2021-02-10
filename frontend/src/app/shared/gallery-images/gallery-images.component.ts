import { Component, Input, OnInit } from '@angular/core';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent implements OnInit {

  @Input() galleryImages?: Image[]; // As imagens da galeria

  modalImagePath = '';    // A imagem que será visualizada na modal
  modalImageName = '';    // O nome da imagem que será visualizada na modal

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
  }

}
