import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IImage } from 'src/models/Image';

@Component({
  selector: 'app-image-listing',
  templateUrl: './image-listing.component.html',
  styleUrls: ['./image-listing.component.scss']
})
export class ImageListingComponent implements OnInit {

  @Input() images?: IImage[];
  /**
   * Imagens que serão exibidas por linha
   * images-per-row-<1,2,3,4,5,6>
   * images-per-row-md-<1,2,3,4,5,6>
   * images-per-row-xl-<1,2,3,4,5,6>
   */
  @Input() imagesPerRow: string | string[] = 'images-per-row-2'; // Por padrão será isso
  @Output() clickedImage = new EventEmitter<string>(); // Event emitted when click on image

  constructor() { }

  ngOnInit(): void {
  }

  onClick(photoId: string): void {
    this.clickedImage.emit(photoId);
  }

}
