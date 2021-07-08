import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parametros } from 'src/app/reporte/models/parametros';
import Swal from 'sweetalert2';
import { Autor } from '../../model/autor';
import { Categoria } from '../../model/categoria';
import { Editorial } from '../../model/editorial';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';
import { VentaService } from '../../service/venta.service';
import { ModalNuevoLibroComponent } from '../modal-nuevo-libro/modal-nuevo-libro.component';
import { VerLibroComponent } from '../ver-libro/ver-libro.component';

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
    });
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
    });
  }
  buscar() {
    const parametro = new Parametros();
    parametro.autor = this.libroForm.get('autor')?.value;
    parametro.categoria = this.libroForm.get('categoria')?.value?.categoriaId;
    parametro.nombre = this.libroForm.get('titulo')?.value;
    this.libroService.listarFiltro(parametro).subscribe((x) => {
      this.libros = x;
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
    let data = {
      editar: false,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        // Intencional
        if (result?.guardado) {
          this.listarLibros();
          Swal.fire({
            icon: 'success',
            title: 'Libro guardado',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (reason) => {
        // Intencional
      }
    );
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.eliminar(id).subscribe((x) => {
          console.log(x);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }

  openModalEditar(id: number) {
    const modalRef = this.modalService.open(ModalNuevoLibroComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      editar: true,
      id,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result?.guardado) {
          this.listarLibros();
          Swal.fire({
            icon: 'success',
            title: 'Libro guardado',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      },
      (reason) => {}
    );
  }

  openModalLibro(id: number) {
    const modalRef = this.modalService.open(VerLibroComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      id,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }
  cambioNombre() {
    this.pageActual = 1;
  }
}
