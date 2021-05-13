import { Component, Input, OnInit } from '@angular/core';

import { IImage } from 'src/models/Image';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent implements OnInit {

  @Input() galleryImages?: IImage[]; // As imagens da galeria

  modalImagePath = '';
  modalImageName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
