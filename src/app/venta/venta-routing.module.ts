import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaLibroComponent } from './components/venta-libro/venta-libro.component';

const routes: Routes = [
  {
    path: '',
    component: VentaLibroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
