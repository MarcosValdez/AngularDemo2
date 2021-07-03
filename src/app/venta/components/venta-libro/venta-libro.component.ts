import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parametros } from 'src/app/reporte/models/parametros';
import { Categoria } from '../../model/categoria';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';
import { VentaService } from '../../service/venta.service';

@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css'],
})
export class VentaLibroComponent implements OnInit {
  libros: Libro[];
  libroForm: FormGroup;
  categorias: Categoria;
  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listarLibros();
    this.listarCategorias();
    this.libroForm = this.formBuilder.group({
      autor: [''],
      categoria: [''],
      titulo: [''],
    });
  }

  listarLibros() {
    this.libroService.listarLibros().subscribe((x) => {
      this.libros = x;
    });
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
      console.log(x);
    });
  }
  buscar() {
    const parametro = new Parametros();
    parametro.autor = this.libroForm.get('autor')?.value;
    parametro.categoria = this.libroForm.get('categoria')?.value;
    parametro.nombre = this.libroForm.get('titulo')?.value;
    console.log(parametro);
    this.libroService
      .listarFiltro(parametro)
      .subscribe((x) => (this.libros = x));
  }
}
