import { FormControl } from '@angular/forms';

export function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;
    if (file) {
      const fileNameArray = file.name.split('.');
      const extension = fileNameArray[fileNameArray.length - 1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }
    return null;
  };
}
