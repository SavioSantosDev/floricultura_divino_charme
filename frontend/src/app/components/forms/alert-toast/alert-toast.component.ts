import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Bootstrap from 'bootstrap';

@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.scss']
})
export class AlertToastComponent implements  AfterViewInit {

  @ViewChild('toast') private toastRef?: ElementRef;
  private toast?: Bootstrap.Toast;

  @Input() headerContent!: string;
  @Input() bodyContent!: string;
  @Input() statusColor!: string; // Bootstrap colors variables
  @Input() animation = true;
  @Input() autohide = true;
  @Input() delay = 5000;

  ngAfterViewInit(): void {
    this.createAndShowToast();
  }

  private createAndShowToast(): void {
    if (this.toastRef) {
      this.toast = new Bootstrap.Toast(this.toastRef.nativeElement, {
        animation: this.animation,
        autohide: this.autohide,
        delay: this.delay,
      });
      this.toast.show();
    }
  }
}
