import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../service/venta.service';

@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css']
})
export class VentaLibroComponent implements OnInit {

  constructor(
    private libroService: VentaService
  ) { }

  ngOnInit(): void {
    this.listarLibros();
  }

  listarLibros(){
    return this.libroService.listarLibros().subscribe(
    x=> {
      console.log(x);
    }
    );
  }

}
