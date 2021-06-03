import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/StoreInformation';
import { FormBase } from 'src/app/shared/formularios/FormBase';
import { CustomValidation } from 'src/app/shared/formularios/CustomValidation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends FormBase implements OnInit {

  storeInformation?: StoreInformation;

  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.storeInformation = route.snapshot.data.storeInformation;
  }

  private buildForm() {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone: [null, [CustomValidation.phone]],
      subject: [null, [Validators.required, Validators.maxLength(2500)]],
      message: [null, [Validators.required, Validators.maxLength(5000)]],
    });
  }

  get contactForm() { return this.form as FormGroup; };

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  submit(): void {
    console.log(this.form?.value);
  }

}
