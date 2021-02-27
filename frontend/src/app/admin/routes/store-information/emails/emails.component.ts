import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBase } from 'src/app/shared/formularios/FormBase';

import { Validation } from 'src/app/shared/formularios/Validation';
import { StoreInformation } from 'src/models/storeInformation/StoreInformation';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent extends FormBase {

  title = 'E-mails para contato';
  infoText = 'Adicione no máximo 2 e-mails que serão utilizados para o cliente entrar em contato com a loja.';

  form; // Implementted

  emails: string[];
  maxControls = 2;


  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.emails = (route.snapshot.data.storeInformation as StoreInformation).emails;

    // Build the form
    this.form = formBuilder.group({
      emails: this.buildEmailsControl(),
    });
  }


  get controlEmails(): FormArray { return this.form?.get('emails') as FormArray; }
  get controlsOfEmails(): FormControl[] { return this.controlEmails.controls as FormControl[]; }


  /**
   * Build the emails control with the all emails values
   */
  buildEmailsControl(): FormArray {
    const controls: FormControl[] = [];
    this.emails?.forEach(email => {
      controls.push(new FormControl(email, [ Validators.required, Validators.email ]));
    });
    return this.formBuilder.array([...controls], Validation.maxControls(this.maxControls));
  }


  /**
   * Submitted the values form.
   */
  submit(): void {
    console.log(this.form?.value);
  }


  /**
   * Método chamado quando o evento 'addInfo' for emitido, que vai adicionar novos campos de email ao formulário
   */
  onAdd(): void {
    const control = this.formBuilder.control(null, [ Validators.required, Validators.email ]);
    this.controlEmails.push(control);
  }


  /**
   * Remover um determinado campo do formulário
   */
  onRemove(index: number): void {
    if (confirm('Confirme para apagar este campo do formulário.')) {
      this.controlEmails.removeAt(index);
    }
  }

}
