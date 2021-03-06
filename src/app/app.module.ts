import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MaterialIconsService } from '@shared/material/material-icons/material-icons.service';
import { BASE_ICONS_LIST } from '@shared/material/material-icons/base-icons-list';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseModule } from '@app/database/database.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    DatabaseModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private materialIconsService: MaterialIconsService,
  ) {
    this.materialIconsService.setIconsRootPath('assets/img');
    this.materialIconsService.addIcons(BASE_ICONS_LIST);
    registerLocaleData(localeRu);
  }
}
