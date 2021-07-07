import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ModalVenderComponent } from './components/modal-vender/modal-vender.component';
import { ModalNuevoLibroComponent } from './components/modal-nuevo-libro/modal-nuevo-libro.component';

@NgModule({
  declarations: [VentaLibroComponent, FilterPipe, CatalogoComponent, ModalVenderComponent, ModalNuevoLibroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VentaRoutingModule,
    NgxPaginationModule,
  ],
})
export class VentaModule {}
