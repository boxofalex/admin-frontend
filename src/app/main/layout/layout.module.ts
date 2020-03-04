import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedModule } from '@shared/shared.module';

const components = [
  HeaderComponent,
  MainMenuComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ...components,
  ]
})
export class LayoutModule { }
