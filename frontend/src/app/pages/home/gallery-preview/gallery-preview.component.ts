import { Component,  OnInit, Input } from '@angular/core';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';
import { PageHomeSGallery } from 'src/models/PageHomeSGallery';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss']
})
export class GalleryPreviewComponent implements OnInit {

  // Conteúdo da sessão galeria
  @Input() sGallery?: PageHomeSGallery;

  constructor() { }

  ngOnInit(): void {
  }

}
