import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { GenerarReporteComponent } from './reporte/components/generar-reporte/generar-reporte.component';
import { VentaLibroComponent } from './venta/components/venta-libro/venta-libro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'venta',
  },
  {
    path: 'venta',
    loadChildren: () =>
      import('./venta/venta.module').then((m) => m.VentaModule),
  },
  {
    path: 'reporte',

    loadChildren: () =>
      import('./reporte/reporte.module').then((m) => m.ReporteModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
