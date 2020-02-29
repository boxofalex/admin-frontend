import { FormControl, ValidationErrors } from '@angular/forms';

export const noEndWhiteSpacesValidator = (minLength: number) => {
  return (formControl: FormControl): ValidationErrors | null => {
    let hasError = false;

    if ((formControl.value.length !== formControl.value.trim().length) &&
      (formControl.value.trim().length < minLength)) {
      hasError = true;
      formControl.setErrors({ endsWithWhitespaces: true });
    }

    return hasError ? { endsWithWhitespaces: true } : null;
  };
};

