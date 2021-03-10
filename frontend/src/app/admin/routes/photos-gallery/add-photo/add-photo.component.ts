import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { FormBase } from 'src/app/shared/formularios/FormBase';
import { PhotosService } from 'src/app/services/photos.service';
import { AlertToastComponent } from 'src/app/shared/formularios/alert-toast/alert-toast.component';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent extends FormBase  {

  uploadPhoto?: File;
  photoPreview?: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private photosService: PhotosService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.form = this.buildForm();
  }


  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
      belongsToGallery: [ true ]
    });
  }

  get formAddPhoto(): FormGroup { return this.form as FormGroup; }
  get controlName(): FormControl { return this.formAddPhoto.get('name') as FormControl; }
  get controlBelongsToGallery(): FormControl { return this.formAddPhoto.get('belongsToGallery') as FormControl; }


  submit(): void {
    const formData = this.buildAndReturnPhotoFormData();
    formData?.forEach(value => console.log(value));
    this.reset();
    this.uploadPhoto = undefined;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertToastComponent);
    const componentRef = this.viewContainerRef.createComponent<AlertToastComponent>(componentFactory);
    componentRef.instance.headerContent = 'Sucesso';
    componentRef.instance.bodyContent = 'Foto adicionada com sucesso!';
    // componentRef.instance.showToast();
  }


  buildAndReturnPhotoFormData(): FormData | null {
    if (this.uploadPhoto) {
      const formData = new FormData();
      formData.append('name', this.controlName.value);
      formData.append('belongsToGallery', this.controlBelongsToGallery.value);
      formData.append('photo', this.uploadPhoto, this.uploadPhoto.name);
      return formData;
    }
    return null;
  }


  setUploadPhotoAndPreview(photos: FileList | null): void {
    if (photos && photos[0]) {
      this.uploadPhoto = photos[0];
      this.preparePhotoPreview(photos[0]);
    }
  }


  preparePhotoPreview(photo: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (event) => this.photoPreview = reader.result;
  }

}
