import { Component,  OnInit, Input } from '@angular/core';

import { HomePageGallery } from 'src/models/Pages';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  @Input() sGallery?: HomePageGallery;

  constructor() { }

  ngOnInit(): void {
  }

}
