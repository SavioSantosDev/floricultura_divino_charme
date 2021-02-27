import { FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';


/**
 * Classe para validações customizadas de formulários
 */
export class Validation {

  // https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates

  static latitudeRegExp = /^(\+|-)?(?:90(?:(?:\.0{1,14})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,14})?))$/;
  static longitudeRegExp = /^(\+|-)?(?:180(?:(?:\.0{1,14})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,14})?))$/;
  static numbersRegExp = /^-?\d+$/;
  static phoneRegExp = /^\(?[1-9]{2}\)?\s?(?:[2-8]|9[1-9])[0-9]{3}\-?\s?[0-9]{4}$/;

  /**
   * @description Checar a quantidade máximas de campos dentro de um form array
   * @param maxLength Quantidade máxima de campos perimtidos dentro do array
   * @returns null ou { maxcontrols: { requiredLength: number, actualLength: number }}
   */
  static maxControls(maxLength: number): ValidatorFn {
    // função que vai receber o array
    const validator: ValidatorFn = (arr) => {
      const arrLength = (arr as FormArray).length;
      return arrLength > maxLength ? {
        maxcontrols: { requiredLength: maxLength, actualLength: arrLength}
      } : null;
    };
    return validator;
  }


  /**
   * Check if the form value is a valid latitude
   */
  static checkLatitude(): ValidatorFn {
    const validator: ValidatorFn = (control) => {
      return this.latitudeRegExp.test((control as FormControl).value) ? null : {
        latitudeInvalid: true
      };
    };
    return validator;
  }


  /**
   * Check if the form value is a valid longitude
   */
  static checkLongitude(): ValidatorFn {
    const validator: ValidatorFn = (control) => {
      return this.longitudeRegExp.test((control as FormControl).value) ? null : {
        longitudeInvalid: true
      };
    };
    return validator;
  }


  /**
   * Check if the form value is a valid phone
   */
  static checkPhone(): ValidatorFn {
    const validator: ValidatorFn = (control) => {
      return this.phoneRegExp.test((control as FormControl).value) ? null : {
        phoneInvalid: true
      };
    };
    return validator;
  }


  /**
   * Check if the form value has the minimum length of decimal digits
   */
  static minDecimalLength(minLength: number): ValidatorFn {
    const validator: ValidatorFn = (control) => {
      // Splitting the number at dot.
      const valueSplitted = (control as FormControl).value?.toString().split('.');

      if (
        !valueSplitted
        || valueSplitted.length > 2 // Cannot has more than 2 dots
        || !this.numbersRegExp.test(valueSplitted[0]) // Invalid number are not responsibility of these method
        || !this.numbersRegExp.test(valueSplitted[1]) // Invalid number are not responsibility of these method
      ){
        return null;
      }
      return valueSplitted[1].length < minLength ? {
        minDecimalLength: { requiredLength: minLength, actualLength: valueSplitted[1].length }
      } : null;
    };
    return validator;
  }


  /**
   * Check if the form value has the maximun length of decimal digits
   */
  static maxDecimalLength(maxLength: number): ValidatorFn {
    const validator: ValidatorFn = (control) => {
      // Split number in dot
      const valueSplitted = (control as FormControl).value?.toString().split('.');

      if (
        !valueSplitted
        || valueSplitted.length > 2 // Cannot has more than 2 dots
        || !this.numbersRegExp.test(valueSplitted[0]) // Invalid number are not responsibility of these method
        || !this.numbersRegExp.test(valueSplitted[1]) // Invalid number are not responsibility of these method
      ){
        return null;
      }

      return valueSplitted[1].length > maxLength ? {
        maxDecimalLength: { requiredLength: maxLength, actualLength: valueSplitted[1].length }
      } : null;
    };
    return validator;
  }


  /**
   * @description Contém todos os erros de validação dos formulários.
   * @param controlLabel Nome do campo do formulário que apresentou o erro.
   * @param errorProp A propriedade do erro lançado.
   * @param errorValue O valor de errorProp.
   */
  static getErrorMessage(  controlLabel: string, errorProp: string, errorValue?: any  ): string {

    // As mensagens de erros que poderão ser retornadas
    const errorMessages: ErrorMessages = {
      required: `${controlLabel} é obrigatório.`,
      minlength: `${controlLabel} precisa ter no mínimo ${errorValue.requiredLength} caracteres.`,
      maxlength: `${controlLabel} precisa ter no máximo ${errorValue.requiredLength} caracteres.`,
      minDecimalLength: `${controlLabel} precisa ter no minimo ${errorValue.requiredLength} dígitos após o ponto.`,
      maxDecimalLength: `${controlLabel} precisa ter no máximo ${errorValue.requiredLength} dígitos após o ponto.`,
      email: 'E-mail inváido.',
      longitudeInvalid: 'Longitude inválida',
      latitudeInvalid: 'Latitude inválida',
      phoneInvalid: 'Formato de telefone inválido',
    };

    if (errorProp in errorMessages) {
      return errorMessages[errorProp]; // Retornar algum dos errors acima
    }

    const defaultError = `campo ${controlLabel} inválido.`;
    return defaultError;
  }
}

type ErrorMessages = {
  [key: string]: string
};
