import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { UiModule } from '@ui/ui.module';

const components = [
  InventoryComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    UiModule,
    InventoryRoutingModule,
  ]
})
export class InventoryModule { }
