import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Categoria } from '../../models/categoria';
import { Libro } from '../../models/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';
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

  /**
   * Metodo para listar los libros
   */
  listarLibros() {
    this.libroService.listarLibros().subscribe((x) => {
      this.libros = x;
    });
  }

  /**
   * Metodo para listar las categorias de los libros
   */
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
    });
  }

  /**
   * Metodo para abrir el modal para crear un libro nuevo
   */
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

  /**
   * Metodo para eliminar un libro
   * @param id Identificador del libro
   */
  eliminar(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir cuando elimines el libro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.eliminar(id).subscribe((x) => {
          Swal.fire('Eliminado!', 'El Libro ha sido eliminado', 'success');
        });
      }
    });
  }

  /**
   * Metodo para abrir el modal para editar un libro
   * @param id Identificador del libro
   */
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

  /**
   * Metodo para abrir el modal para ver la informacion de un libro
   * @param id Identificador del libro
   */
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

  /**
   * Metodo para cambiar a la primera pagina
   */
  cambioNombre() {
    this.pageActual = 1;
  }

  /**
   * Metodo para descargar un excel con el inventario
   */
  descargar() {
    this.libroService.descargar().subscribe((result) => {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Inventario.xls';
      a.click();
      return url;
    });
  }

  /**
   * Metodo para eliminar la busqueda anterior
   */
  borrarBusqueda() {
    this.filterlibro = '';
  }
}
