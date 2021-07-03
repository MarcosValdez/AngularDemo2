import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/app/venta/model/libro';
import { LibroService } from 'src/app/venta/service/libro.service';
import { Parametros } from '../../models/parametros';
import { Reporte } from '../../models/reporte';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css'],
})
export class GenerarReporteComponent implements OnInit {
  libros: Reporte[];
  formLibro: FormGroup;
  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formLibro = this.formBuilder.group({
      autor: [''],
      categoria: [''],
      nombre: [''],
      fechaInicio: [''],
      fechaFin: [''],
    });
    this.buscar();
  }

  buscar() {
    const parametro = new Parametros();
    parametro.autor = this.formLibro.get('autor')?.value;
    parametro.categoria = this.formLibro.get('categoria')?.value;
    parametro.nombre = this.formLibro.get('nombre')?.value;
    parametro.fechaFin = this.formLibro.get('fechaFin')?.value;
    parametro.fechaInicio = this.formLibro.get('fechaInicio')?.value;
    console.log(parametro);
    this.libroService
      .listarFiltro(parametro)
      .subscribe((x) => (this.libros = x));
  }

  onFnExportar() {
    const parametro = new Parametros();
    parametro.autor = this.formLibro.get('autor')?.value;
    parametro.categoria = this.formLibro.get('categoria')?.value;
    parametro.nombre = this.formLibro.get('nombre')?.value;
    parametro.fechaFin = this.formLibro.get('fechaFin')?.value;
    parametro.fechaInicio = this.formLibro.get('fechaInicio')?.value;
    this.libroService.exportarExcel(parametro).subscribe((result) => {
      console.log(result);
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Reporte.xls';
      a.click();
      return url;
    });
  }

  reestablecer() {
    this.formLibro.get('autor')?.setValue('');
    this.formLibro.get('categoria')?.setValue('');
    this.formLibro.get('nombre')?.setValue('');
    this.formLibro.get('fechaFin')?.setValue('');
    this.formLibro.get('fechaInicio')?.setValue('');
  }
}
