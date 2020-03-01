import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { IMaterialIcon } from './material-icon.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MaterialIconsService {
  private iconsRootPath = '';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  public setIconsRootPath(path: string) {
    this.iconsRootPath = path;
  }

  public addIcon(icon: IMaterialIcon) {
    this.matIconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconsRootPath}/${icon.src}`));
  }

  public addIcons(icons: IMaterialIcon[]) {
    icons.forEach((icon: IMaterialIcon) => {
      this.addIcon(icon);
    });
  }
}
