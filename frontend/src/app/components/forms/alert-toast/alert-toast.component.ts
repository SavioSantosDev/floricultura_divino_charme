import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Bootstrap from 'bootstrap';

@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.scss']
})
export class AlertToastComponent implements OnInit, AfterViewInit {

  @Input() statusColor = 'success';
  @Input() headerContent?: string;
  @Input() bodyContent?: string;
  @ViewChild('toast') private toastRef?: ElementRef;
  private toast?: Bootstrap.Toast;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createToast();
  }

  private createToast(): void {
    if (this.toastRef) {
      this.toast = new Bootstrap.Toast(this.toastRef.nativeElement);
      this.toast.show();
    }
  }

  // showToast(): void {
  //   if (this.toast) {
  //     this.toast.show();
  //   }
  // }

}
