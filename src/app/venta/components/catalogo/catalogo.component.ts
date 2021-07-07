import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../model/categoria';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';
import { ModalVenderComponent } from '../modal-vender/modal-vender.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  filterlibro: number[] = [];

  pageActual: number;
  previousLabel = 'Anterior';
  nextLabel = 'Siguiente';
  responsive: boolean = true;
  libros: Libro[];
  librosGenerales: Libro[];
  categorias: Categoria[];
  busqueda: number[];
  constructor(
    private categoriaService: CategoriaService,
    private libroService: LibroService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.listarLibros();
    this.busqueda = [];
  }

  /**
   * Método para listar las categorias
   */
  listarCategorias() {
    this.categoriaService
      .listarCategorias()
      .subscribe((x) => (this.categorias = x));
  }

  /**
   * Método para listar los libros
   */
  listarLibros() {
    this.libroService.listarLibros().subscribe((x) => {
      this.libros = x;
      this.librosGenerales = x;
      console.log(x);
    });
  }

  /**
   * Filtrar los elementos que se muestran en el catálogo segun la categoria seleccionada
   * @param id Identificador de la categoria
   */
  buscar(id: number) {
    this.pageActual = 1;
    if (this.busqueda.find((e) => e === id) === undefined) {
      this.busqueda.push(id);
    } else {
      this.busqueda = this.busqueda.filter((e) => e != id);
    }

    if (this.busqueda.length === 0) {
      this.libros = this.librosGenerales;
    } else {
      this.libros = this.librosGenerales.filter((e) => {
        for (let i = 0; i < this.busqueda.length; i++) {
          if (e.categoria.categoriaId === this.busqueda[i]) {
            return true;
          }
        }
        return false;
      });
    }
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(ModalVenderComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'lg',
    });
    let data = {
      id,
    };
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
