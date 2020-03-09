import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './database.service';
import { FirebaseModule } from '@app/firebase/firebase.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule,
  ],
  providers: [
    DatabaseService,
  ]
})
export class DatabaseModule { }
