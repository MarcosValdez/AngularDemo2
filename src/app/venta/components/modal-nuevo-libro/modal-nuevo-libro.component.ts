import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Autor } from '../../model/autor';
import { Categoria } from '../../model/categoria';
import { Editorial } from '../../model/editorial';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-modal-nuevo-libro',
  templateUrl: './modal-nuevo-libro.component.html',
  styleUrls: ['./modal-nuevo-libro.component.css'],
})
export class ModalNuevoLibroComponent implements OnInit {
  libroFormGuardar: FormGroup;
  categorias: Categoria;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private libroService: LibroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
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

  closeModal(sendData) {
    this.activeModal.close(sendData);
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
      /* document.getElementById('cerrar').click(); */
      this.closeModal('guardado');
    });
  }
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
      console.log(x);
    });
  }
}
