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
  libroFormGuardar: FormGroup;
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
    this.libroFormGuardar = this.formBuilder.group({
      autorGuardar: [''],
      categoriaGuardar: [''],
      nombreGuardar: [''],
      precio: [''],
      cantidad: [''],
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
    parametro.categoria = this.libroForm.get('categoria')?.value?.categoriaId;
    parametro.nombre = this.libroForm.get('titulo')?.value;
    console.log(parametro);
    this.libroService.listarFiltro(parametro).subscribe((x) => {
      this.libros = x;
      console.log(x);
    });
  }

  guardar() {
    const libro = new Libro();
    libro.nombre = this.libroFormGuardar.get('nombreGuardar').value;
  }
}
