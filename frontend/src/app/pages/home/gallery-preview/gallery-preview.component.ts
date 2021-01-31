import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss', '../../gallery.scss']
})
export class GalleryPreviewComponent implements OnInit {

  // Cada array interno é uma linha
  imgPathBase = '../../../../assets/images/';
  gallery = [
    [ `${this.imgPathBase}img5.jpg`, `${this.imgPathBase}img6.jpg`, `${this.imgPathBase}img7.jpg` ],
    [ `${this.imgPathBase}img8.jpg`, `${this.imgPathBase}img9.jpg`, `${this.imgPathBase}img4.jpg` ],
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
