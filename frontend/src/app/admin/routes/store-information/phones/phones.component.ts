import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBase } from 'src/app/shared/formularios/FormBase';
import { Validation } from 'src/app/shared/formularios/Validation';
import { StoreInformation } from 'src/models/storeInformation/StoreInformation';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent extends FormBase {

  title = 'Endereços da loja';
  infoText = 'Os endereços da loja. Latitude e longitude correspondem as coordenadas para o usuário visualizar no mapa.';

  form; // Implementted

  phones?: string[];
  maxControls = 2;


  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.phones = (route.snapshot.data.storeInformation as StoreInformation).phones;

    // Build the form
    this.form = formBuilder.group({
      phones: this.buildForm(),
    });
  }


  /**
   * Create a group of controls for each phone in this.phone
   */
  buildForm(): FormArray {
    const phonesArray = this.phones && this.phones.length > 0
      ? this.phones.map(phone => (this.buildPhoneControl(phone)))
      : [this.buildPhoneControl()]; // Empty phone control

    return this.formBuilder.array(phonesArray, Validation.maxControls(this.maxControls));
  }


  /**
   * Build a single control of phone
   */
  buildPhoneControl(phone?: string): FormControl {
    return this.formBuilder.control(phone, [ Validators.required, Validation.checkPhone() ]);
  }


  get controlPhones(): FormArray { return this.form.get('phones') as FormArray; }
  get controlsOfPhones(): FormControl[] { return this.controlPhones.controls as FormControl[]; }


  /**
   * Submitted the values form.
   */
  submit(): void {
    console.log(this.form.value);
  }


  /**
   * Add a new control or form group in the form
   */
  onAdd(): void {
    this.controlPhones.push(this.buildPhoneControl());
  }


  /**
   * Removes a given field from the form
   */
  onRemove(index: number): void {
    if (confirm('Confirme para apagar este campo do formulário.')) {
      this.controlPhones.removeAt(index);
    }
  }

}
