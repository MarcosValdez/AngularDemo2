import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent,
  },
  {
    path: 'registro',
    component: VentaLibroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaRoutingModule {}
