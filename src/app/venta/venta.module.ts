import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VentaLibroComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, VentaRoutingModule],
})
export class VentaModule {}
