import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBase } from 'src/app/shared/formularios/FormBase';
import { Social } from 'src/models/storeInformation/Social';
import { StoreInformation } from 'src/models/storeInformation/StoreInformation';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent extends FormBase {

  title = 'Redes sociais';
  infoText = 'Para adicionar mais entre em contato com o desenvolvedor';

  form; // Implementted

  social?: Social;


  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.social = (route.snapshot.data.storeInformation as StoreInformation).social;

    // Build the form
    this.form = formBuilder.group({
      social: formBuilder.group({
        instagram: [ this.social?.instagram, Validators.required ]
      })
    });
  }


  get groupSocial(): FormGroup { return this.form.get('social') as FormGroup; }
  get controlInstagram(): FormControl { return this.groupSocial.get('instagram') as FormControl; }


  /**
   * Submitted the values form.
   */
  submit(): void {
    console.log(this.form?.value);
  }

}
