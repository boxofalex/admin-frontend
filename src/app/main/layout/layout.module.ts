import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { UiModule } from '@ui/ui.module';

const components = [
  HeaderComponent,
  MainMenuComponent,
  AccountMenuComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    UiModule,
  ],
  exports: [
    ...components,
  ]
})
export class LayoutModule { }
