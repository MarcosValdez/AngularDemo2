import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parametros } from 'src/app/reporte/models/parametros';
import { Autor } from '../../model/autor';
import { Categoria } from '../../model/categoria';
import { Editorial } from '../../model/editorial';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';
import { VentaService } from '../../service/venta.service';
import { ModalNuevoLibroComponent } from '../modal-nuevo-libro/modal-nuevo-libro.component';

@Component({
  selector: 'app-venta-libro',
  templateUrl: './venta-libro.component.html',
  styleUrls: ['./venta-libro.component.css'],
})
export class VentaLibroComponent implements OnInit {
  filterlibro: string = '';
  libros: Libro[];
  libroForm: FormGroup;
  categorias: Categoria;
  numRows = 10;
  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  //filtro de cursos
  cursoFilter: string = '';
  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private modalService: NgbModal
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

  vender(id: number) {
    this.libroService.vender(id).subscribe((x) => this.listarLibros());
  }

  openModal() {
    const modalRef = this.modalService.open(ModalNuevoLibroComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {};
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        // Intencional
      },
      (reason) => {
        // Intencional
      }
    );
  }
}
