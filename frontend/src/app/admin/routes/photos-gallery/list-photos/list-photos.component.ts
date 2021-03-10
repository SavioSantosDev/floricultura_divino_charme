import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Photo } from 'src/models/Photo';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss']
})
export class ListPhotosComponent implements OnInit {

  photos?: Photo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.photos = this.route.snapshot.data.photos as Photo[];
  }


  navigateToEditPhoto(photoId: string): void {
    this.router.navigate(['editar', photoId], { relativeTo: this.route });
  }


  navigateToAddPhoto(): void {
    this.router.navigate(['adicionar'], { relativeTo: this.route });
  }

}
