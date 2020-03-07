import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedModule } from '@shared/shared.module';
import { AccountMenuComponent } from './account-menu/account-menu.component';

const components = [
  HeaderComponent,
  MainMenuComponent,
];

@NgModule({
  declarations: [
    ...components,
    AccountMenuComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ...components,
  ]
})
export class LayoutModule { }
