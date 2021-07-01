import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';


@NgModule({
  declarations: [
    VentaLibroComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule
  ]
})
export class VentaModule { }
