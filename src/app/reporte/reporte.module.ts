import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [GenerarReporteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReporteRoutingModule,
    NgxPaginationModule,
  ],
})
export class ReporteModule {}
