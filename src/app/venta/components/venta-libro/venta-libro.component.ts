import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parametros } from 'src/app/reporte/models/parametros';
import { Autor } from '../../model/autor';
import { Categoria } from '../../model/categoria';
import { Editorial } from '../../model/editorial';
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
  filterlibro:string ="";
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
      autorGuardar: ['', Validators.required],
      categoriaGuardar: ['', Validators.required],
      nombreGuardar: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      editorial: ['', Validators.required],
      descripcion: ['', Validators.required],
      // fecha: ['', Validators.required],
      paginas: ['', Validators.required],
    });
  }

  listarLibros() {
    this.libroService.listarLibros().subscribe((x) => {
      this.libros = x;
      console.log(x);
      
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
    let autor = new Autor();
    autor.nombre = this.libroFormGuardar.get('autorGuardar').value;
    libro.autor = autor;
    let categoria = new Categoria();
    categoria.categoriaId =
      this.libroFormGuardar.get('categoriaGuardar').value?.categoriaId;
    libro.categoria = categoria;
    libro.precio = this.libroFormGuardar.get('precio').value;
    libro.cantidad = this.libroFormGuardar.get('cantidad').value;
    let editorial = new Editorial();
    editorial.nombre = this.libroFormGuardar.get('editorial').value;
    libro.editorial = editorial;
    //libro.fecha = this.libroFormGuardar.get('fecha').value;
    libro.descripcion = this.libroFormGuardar.get('descripcion').value;
    libro.paginas = this.libroFormGuardar.get('paginas').value;
    this.libroService.save(libro).subscribe((x) => {
      console.log(x);
      document.getElementById('cerrar').click();
      this.listarLibros();
    });
  }

  vender(id: number) {
    this.libroService.vender(id).subscribe((x) => this.listarLibros());
  }
}
