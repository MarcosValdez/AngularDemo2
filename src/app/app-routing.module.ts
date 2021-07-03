import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarReporteComponent } from './reporte/components/generar-reporte/generar-reporte.component';
import { VentaLibroComponent } from './venta/components/venta-libro/venta-libro.component';

const routes: Routes = [

  
  {
    path: 'venta',
    loadChildren: () =>
      import('./venta/venta.module').then((m) => m.VentaModule),
  },
  {
    path: 'reporte',
    component: GenerarReporteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
