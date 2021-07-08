import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inventario',
  },
  {
    path: 'inventario',
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
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
