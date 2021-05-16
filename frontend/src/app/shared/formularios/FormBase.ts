import { FormArray, FormGroup } from '@angular/forms';

export abstract class FormBase {

  protected form?: FormGroup;

  constructor(
  ) { }


  /**
   * Method called when the form is ready to be submitted
   */
  abstract submit(): void;


  /**
   * If the form values is ok, the submit method will be called, else all fiedls ll be mark as touched
   */
  onSubmit(): void {
    if (this.form) {
      this.form.valid ? this.submit() : this.markAllFieldsAsTouched(this.form);
    }
  }


  /**
   * Mark all fields as touched (for css stylization) for user to identify the invalid fields
   */
  markAllFieldsAsTouched(  controlsGroup: FormGroup | FormArray  ): void {
    Object.keys(  controlsGroup.controls  ).forEach(  control => {
      const formControl = controlsGroup.get(control);
      if (formControl) {
        formControl.markAsTouched();
      }

      // Recussivity for to call the method agin if there are more fields grouped
      if (  formControl instanceof FormGroup || formControl instanceof FormArray  ) {
        this.markAllFieldsAsTouched(  formControl  );
      }
    });
  }


  /**
   * Clear the form values
   */
  reset(): void {
    this.form?.reset();
  }
}
