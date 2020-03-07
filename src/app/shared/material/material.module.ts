import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MATERIAL_MODULES = [
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  OverlayModule,
  DragDropModule,
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES]
})
export class MaterialModule {

}
