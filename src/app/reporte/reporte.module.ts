import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { GenerarReporteComponent } from './components/generar-reporte/generar-reporte.component';


@NgModule({
  declarations: [
    GenerarReporteComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule
  ]
})
export class ReporteModule { }
