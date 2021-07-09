import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/venta/models/categoria';
import { Venta } from 'src/app/venta/models/venta';
import { CategoriaService } from 'src/app/venta/service/categoria.service';
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
  categorias: Categoria[];
  formLibro: FormGroup;
  ventas: Venta[];

  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
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
    this.listarCategorias();
  }

  /**
   * Método para la busqueda de las ventas realizadas segun los filtros ingresados
   */
  buscar() {
    const parametro = new Parametros();
    parametro.autor = this.formLibro.get('autor')?.value;
    parametro.categoria = this.formLibro.get('categoria')?.value?.categoriaId;
    parametro.nombre = this.formLibro.get('nombre')?.value;
    parametro.fechaFin = this.formLibro.get('fechaFin')?.value;
    parametro.fechaInicio = this.formLibro.get('fechaInicio')?.value;
    this.libroService.listarFiltro(parametro).subscribe((x) => {
      this.libros = x;
    });
  }

  /**
   * Método para generar el reporte de ventas
   */
  onFnExportar() {
    const parametro = new Parametros();
    parametro.autor = this.formLibro.get('autor')?.value;
    parametro.categoria = this.formLibro.get('categoria')?.value;
    parametro.nombre = this.formLibro.get('nombre')?.value;
    parametro.fechaFin = this.formLibro.get('fechaFin')?.value;
    parametro.fechaInicio = this.formLibro.get('fechaInicio')?.value;
    this.libroService.exportarExcel(parametro).subscribe((result) => {
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

  /**
   * Método para eliminar los filtros anteriores
   */
  reestablecer() {
    this.formLibro.get('autor')?.setValue('');
    this.formLibro.get('categoria')?.setValue('');
    this.formLibro.get('nombre')?.setValue('');
    this.formLibro.get('fechaFin')?.setValue('');
    this.formLibro.get('fechaInicio')?.setValue('');
    this.libroService.listarFiltro(new Parametros()).subscribe((x) => {
      this.libros = x;
    });
  }

  /**
   * Método para la busqueda de las categorias que puede tener un libro
   */
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
    });
  }
}
