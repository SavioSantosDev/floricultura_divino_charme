import { Component, Input, OnInit } from '@angular/core';

import { Photo } from 'src/models/Photo';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss']
})
export class GalleryImagesComponent implements OnInit {

  @Input() galleryImages?: Photo[]; // As imagens da galeria

  modalImagePath = '';
  modalImageName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
