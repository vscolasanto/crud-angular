import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `<p class="text-danger">{{errorMessage}}</p>`,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control') formControl: FormControl

  constructor() { }

  ngOnInit(): void { }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage()
    } else {
      return null
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage(): string | null {
    const error = this.formControl.errors

    if (error?.required) {
      return 'Campo obrigatório'

    } else if (error?.minlength) {
      const actualLength = error?.minlength.actualLength
      const requiredMinLength = error?.minlength.requiredLength
      return `Minímo de ${requiredMinLength} caracteres. Atual: ${actualLength}`

    } else if (error?.maxlength) {
      const actualLength = error?.minlength.actualLength
      const requiredMaxLength = error?.maxlength.requiredLength
      return `Máximo de ${requiredMaxLength} caracteres. Atual: ${actualLength}`
    } else {
      return null
    }
  }
}
