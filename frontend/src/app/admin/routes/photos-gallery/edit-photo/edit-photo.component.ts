import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from 'src/models/Photo';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {

  photo?: Photo;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.photo = this.route.snapshot.data.photo as Photo;
  }

}
