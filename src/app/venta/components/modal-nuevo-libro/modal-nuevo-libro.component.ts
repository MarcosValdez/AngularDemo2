import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Autor } from '../../models/autor';
import { Categoria } from '../../models/categoria';
import { Editorial } from '../../models/editorial';
import { Libro } from '../../models/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-modal-nuevo-libro',
  templateUrl: './modal-nuevo-libro.component.html',
  styleUrls: ['./modal-nuevo-libro.component.css'],
})
export class ModalNuevoLibroComponent implements OnInit {
  @Input() fromParent;
  libroFormGuardar: FormGroup;
  categorias: Categoria[];
  editar: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private libroService: LibroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.libroFormGuardar = this.formBuilder.group({
      autorGuardar: ['', [Validators.required, Validators.minLength(4)]],
      categoriaGuardar: ['', Validators.required],
      nombreGuardar: ['', [Validators.required, Validators.minLength(4)]],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      editorial: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      fecha: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.max(2021),
        ],
      ],
      paginas: ['', [Validators.required, Validators.min(1)]],
      imagen: ['', Validators.required],
    });
    this.listarCategorias();
    this.editar = this.fromParent.editar;
    if (this.editar) {
      this.cargarFormulario(this.fromParent.id);
    }
  }

  get nombreNoValido() {
    return (
      this.libroFormGuardar.get('nombreGuardar').invalid &&
      this.libroFormGuardar.get('nombreGuardar').touched
    );
  }

  get descripcionNoValido() {
    return (
      this.libroFormGuardar.get('descripcion').invalid &&
      this.libroFormGuardar.get('descripcion').touched
    );
  }

  get autorNoValido() {
    return (
      this.libroFormGuardar.get('autorGuardar').invalid &&
      this.libroFormGuardar.get('autorGuardar').touched
    );
  }

  get categoriaNoValido() {
    return (
      this.libroFormGuardar.get('categoriaGuardar').invalid &&
      this.libroFormGuardar.get('categoriaGuardar').touched
    );
  }

  get paginasNoValido() {
    return (
      this.libroFormGuardar.get('paginas').invalid &&
      this.libroFormGuardar.get('paginas').touched
    );
  }

  get editorialNoValido() {
    return (
      this.libroFormGuardar.get('editorial').invalid &&
      this.libroFormGuardar.get('editorial').touched
    );
  }

  get fechaNoValido() {
    return (
      this.libroFormGuardar.get('fecha').invalid &&
      this.libroFormGuardar.get('fecha').touched
    );
  }

  get precioNoValido() {
    return (
      this.libroFormGuardar.get('precio').invalid &&
      this.libroFormGuardar.get('precio').touched
    );
  }
  get cantidadNoValido() {
    return (
      this.libroFormGuardar.get('cantidad').invalid &&
      this.libroFormGuardar.get('cantidad').touched
    );
  }

  get imagenValido() {
    return (
      this.libroFormGuardar.get('imagen').invalid &&
      this.libroFormGuardar.get('imagen').touched
    );
  }
  /**
   * Método para cerrar la ventana actual
   * @param sendData Mensaje que se envia al componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  /**
   * Método para comprobar que los datos ingresados son válidos y se puedan guardar
   */
  validar() {
    if (this.libroFormGuardar.valid) {
      const libro = new Libro();
      libro.nombre = this.libroFormGuardar.get('nombreGuardar').value;
      let autor = new Autor();
      autor.nombre = this.libroFormGuardar.get('autorGuardar').value;
      libro.autor = autor;
      let categoria = new Categoria();
      categoria.categoriaId =
        this.libroFormGuardar.get('categoriaGuardar').value;
      libro.categoria = categoria;
      libro.precio = this.libroFormGuardar.get('precio').value;
      libro.cantidad = this.libroFormGuardar.get('cantidad').value;
      let editorial = new Editorial();
      editorial.nombre = this.libroFormGuardar.get('editorial').value;
      libro.editorial = editorial;
      libro.anio = this.libroFormGuardar.get('fecha').value;
      libro.descripcion = this.libroFormGuardar.get('descripcion').value;
      libro.paginas = this.libroFormGuardar.get('paginas').value;
      libro.imagen = this.libroFormGuardar.get('imagen').value;
      if (this.editar) {
        libro.libroId = this.fromParent.id;
      }
      this.guardar(libro);
    } else {
      Object.values(this.libroFormGuardar.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Metodo para guardar el libro
   * @param libro Objeto con los datos del libro
   */
  guardar(libro: Libro) {
    this.libroService.save(libro).subscribe((x) => {
      this.closeModal({ guardado: true });
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
   * Metodo para obtener la informacion de un libro
   * @param id Identificador del libro
   */
  cargarFormulario(id: number) {
    this.libroService.obtenerLibro(id).subscribe((x: Libro) => {
      this.libroFormGuardar.get('nombreGuardar').setValue(x?.nombre);
      this.libroFormGuardar.get('descripcion').setValue(x?.descripcion);
      this.libroFormGuardar.get('autorGuardar').setValue(x?.autor?.nombre);
      this.libroFormGuardar
        .get('categoriaGuardar')
        .setValue(x?.categoria?.categoriaId);
      this.libroFormGuardar.get('paginas').setValue(x?.paginas);
      this.libroFormGuardar.get('editorial').setValue(x?.editorial?.nombre);
      this.libroFormGuardar.get('fecha').setValue(x?.anio);
      this.libroFormGuardar.get('precio').setValue(x?.precio);
      this.libroFormGuardar.get('cantidad').setValue(x?.cantidad);
      this.libroFormGuardar.get('imagen').setValue(x?.imagen);
    });
  }
}
