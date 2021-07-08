import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../model/categoria';
import { Libro } from '../../model/libro';
import { CategoriaService } from '../../service/categoria.service';
import { LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-ver-libro',
  templateUrl: './ver-libro.component.html',
  styleUrls: ['./ver-libro.component.css'],
})
export class VerLibroComponent implements OnInit {
  @Input() fromParent;
  libroForm: FormGroup;
  categorias: Categoria[];
  libro: Libro;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private libroService: LibroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.libroForm = this.formBuilder.group({
      autorGuardar: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(4)],
      ],
      categoriaGuardar: [{ value: '', disabled: true }, Validators.required],
      nombreGuardar: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(4)],
      ],
      precio: [{ value: '', disabled: true }, Validators.required],
      cantidad: [{ value: '', disabled: true }, Validators.required],
      editorial: [{ value: '', disabled: true }, Validators.required],
      descripcion: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(20)],
      ],
      fecha: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.max(2021),
        ],
      ],
      paginas: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(1)],
      ],
      imagen: [{ value: '', disabled: true }, Validators.required],
    });
    this.listarCategorias();
    this.cargarFormulario(this.fromParent.id);
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((x) => {
      this.categorias = x;
      console.log(x);
    });
  }
  cargarFormulario(id: number) {
    this.libroService.obtenerLibro(id).subscribe((x: Libro) => {
      this.libro = x;
      this.libroForm.get('nombreGuardar').setValue(x?.nombre);
      this.libroForm.get('descripcion').setValue(x?.descripcion);
      this.libroForm.get('autorGuardar').setValue(x?.autor?.nombre);
      this.libroForm
        .get('categoriaGuardar')
        .setValue(x?.categoria?.categoriaId);
      this.libroForm.get('paginas').setValue(x?.paginas);
      this.libroForm.get('editorial').setValue(x?.editorial?.nombre);
      this.libroForm.get('fecha').setValue(x?.anio);
      this.libroForm.get('precio').setValue(x?.precio);
      this.libroForm.get('cantidad').setValue(x?.cantidad);
      this.libroForm.get('imagen').setValue(x?.imagen);
    });
  }
}
