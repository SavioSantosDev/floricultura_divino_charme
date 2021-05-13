import { Component,  OnInit, Input } from '@angular/core';

import { IGallery } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  @Input() homeGallery?: IGallery;

  constructor() { }

  ngOnInit(): void {
  }

}
