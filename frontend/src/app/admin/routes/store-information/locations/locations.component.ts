import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/storeInformation/StoreInformation';
import { GeoLocation } from 'src/models/storeInformation/GeoLocation';
import { StoreInformationBaseComponent } from '../store-information-base/store-information-base.component';
import { Validation } from 'src/app/shared/formularios/Validation';
import { FormBase } from 'src/app/shared/formularios/FormBase';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent extends FormBase {

  title = 'Endereços da loja';
  infoText = 'Os endereços da loja. Latitude e longitude correspondem as coordenadas para o usuário visualizar no mapa.';

  form; // Implementted

  locations?: GeoLocation[];
  maxControls = 2;


  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.locations = (route.snapshot.data.storeInformation as StoreInformation).locations;

    // Build the form
    this.form = formBuilder.group({
      locations: this.buildForm(),
    });
  }


  /**
   * Create a group of controls for each location in this.locations
   */
  buildForm(): FormArray {
    const locationGroup = this.locations && this.locations.length > 0
      ? this.locations.map(location => (this.buildLocationControl(location)))
      : [this.buildLocationControl()]; // Empty control location

    return this.formBuilder.array(locationGroup, Validation.maxControls(this.maxControls));
  }


  /**
   * Build a form group of location
   */
  buildLocationControl(location?: GeoLocation): FormGroup {
    return this.formBuilder.group({
      address: [ location?.address, [ Validators.required, Validators.maxLength(255) ] ],
      city: [ location?.city, [ Validators.required, Validators.maxLength(255) ] ],
      uf: [ location?.uf, Validators.required ],
      lat: [
        location?.lat,
        [
          Validators.required,
          Validation.minDecimalLength(6),
          Validation.maxDecimalLength(10),
          Validation.checkLatitude()
        ]
      ],
      lng: [
        location?.lng,
        [
          Validators.required,
          Validation.minDecimalLength(6),
          Validation.maxDecimalLength(10),
          Validation.checkLongitude()
        ]
      ],
      // Note: Check latitude and longitude validation by last
    });
  }


  // form.locations and form.locations.controls
  get controlLocations(): FormArray { return this.form.get('locations') as FormArray; }
  get groupOfLocations(): FormGroup[] { return this.controlLocations.controls as FormGroup[]; }

  // Getters from each control in form.locations
  getControlUf(index: number): FormControl { return this.groupOfLocations[index].get('uf') as FormControl; }
  getControlCity(index: number): FormControl { return this.groupOfLocations[index].get('city') as FormControl; }
  getControlAddress(index: number): FormControl { return this.groupOfLocations[index].get('address') as FormControl; }
  getControlLat(index: number): FormControl { return this.groupOfLocations[index].get('lat') as FormControl; }
  getControlLng(index: number): FormControl { return this.groupOfLocations[index].get('lng') as FormControl; }



  /**
   * Submitted the values form.
   */
  submit(): void {
    console.log(this.form?.value);
  }


  /**
   * Add a new control or form group in the form
   */
  onAdd(): void {
    const locationGroup = this.buildLocationControl();
    this.controlLocations.push(locationGroup);
  }


  /**
   * Removes a given field from the form
   */
  onRemove(index: number): void {
    if (confirm('Confirme para apagar este campo do formulário.')) {
      this.controlLocations.removeAt(index);
    }
  }

}
