import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormBase } from 'src/app/shared/formularios/FormBase';
import { AuthService } from 'src/app/services/auth.service';
import { AlertToastService } from 'src/app/components/forms/alert-toast/alert-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBase {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertToastService: AlertToastService,
    private viewContainerRef: ViewContainerRef,
  ) {
    super();
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    })
  }

  private resetFormAndNavigateToAdminPage() {
    this.reset();
    this.router.navigate(['admin']);
  }

  private createAnsShowErrorToast() {
    this.alertToastService.createAndShowToast(this.viewContainerRef, {
      headerContent: 'Erro',
      bodyContent: 'Administrador inválido!',
      statusColor: 'danger',
    });
  }

  get formLogin(): FormGroup { return this.form as FormGroup; }
  get controlEmail(): FormControl { return this.formLogin.get('email') as FormControl; }
  get controlPassword(): FormControl { return this.formLogin.get('password') as FormControl; }

  submit(): void {
    const formValues = JSON.stringify(this.form?.value)
    console.log(formValues);
    this.authService.login(formValues).subscribe((res) => {
      res
        ? this.resetFormAndNavigateToAdminPage()
        : this.createAnsShowErrorToast();
    });
  }
}
