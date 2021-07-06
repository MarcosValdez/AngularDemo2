import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [VentaLibroComponent, FilterPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VentaRoutingModule,
    NgxPaginationModule,
  ],
})
export class VentaModule {}
