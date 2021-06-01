import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as Bootstrap from 'bootstrap';

import { FormBase } from 'src/app/shared/formularios/FormBase';
import { CustomValidation } from 'src/app/shared/formularios/CustomValidation';
import { IProduct } from 'src/models/Product';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.scss']
})
export class PurchaseModalComponent extends FormBase implements AfterViewInit, OnInit, OnDestroy {

  private modal?: Bootstrap.Modal;
  private _onCloseModal = new Subject();
  @Input() product?: IProduct;
  @Output() onCloseModal = this._onCloseModal.asObservable();
  @ViewChild('purchaseModal') modalRef?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  private createAndShowModal() {
    this.modal = new Bootstrap.Modal(this.modalRef?.nativeElement, {
      backdrop: false
    });
    this.modal.show();
  }

  private buildForm() {
    const subject = `Compra de um(a) ${this.product?.name || 'produto'}`;
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone: [null, [CustomValidation.phone]],
      subject: [subject],
      message: [null, [Validators.required, Validators.maxLength(5000)]],
    });
  }

  get purchaseForm() { return this.form as FormGroup; };
  get cName() { return this.purchaseForm.get('name') as FormControl };
  get cEmail() { return this.purchaseForm.get('email') as FormControl };
  get cPhone() { return this.purchaseForm.get('phone') as FormControl };
  get cSubject() { return this.purchaseForm.get('subject') as FormControl };
  get cMessage() { return this.purchaseForm.get('message') as FormControl };

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  ngAfterViewInit(): void {
    this.createAndShowModal();
  }

  ngOnDestroy(): void {
    this.modal?.hide();
  }

  closeModal() {
    this._onCloseModal.next();
  }

  submit(): void {
    console.log(this.form?.value);
  }

}
