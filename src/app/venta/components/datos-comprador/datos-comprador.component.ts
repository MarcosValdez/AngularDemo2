import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Libro } from '../../model/libro';
import { Comprador } from '../../models/comprador';
import { Venta } from '../../models/venta';
import { VentaService } from '../../service/venta.service';

@Component({
  selector: 'app-datos-comprador',
  templateUrl: './datos-comprador.component.html',
  styleUrls: ['./datos-comprador.component.css'],
})
export class DatosCompradorComponent implements OnInit {
  @Input() fromParent;
  compradorForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    console.log(this.fromParent.id);
    this.compradorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      cuenta: ['', Validators.required],
    });
  }
  get nombreNoValido() {
    return (
      this.compradorForm.get('nombre').invalid &&
      this.compradorForm.get('nombre').touched
    );
  }
  get apellidoNoValido() {
    return (
      this.compradorForm.get('apellido').invalid &&
      this.compradorForm.get('apellido').touched
    );
  }
  get dniNoValido() {
    return (
      this.compradorForm.get('dni').invalid &&
      this.compradorForm.get('dni').touched
    );
  }
  get cuentaNoValido() {
    return (
      this.compradorForm.get('cuenta').invalid &&
      this.compradorForm.get('cuenta').touched
    );
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  pagar() {
    if (this.compradorForm.valid) {
      let venta = new Venta();
      let comprador = new Comprador();
      comprador.nombre = this.compradorForm.get('nombre').value;
      comprador.apellido = this.compradorForm.get('apellido').value;
      comprador.dni = this.compradorForm.get('dni').value;
      venta.comprador = comprador;
      let libro = new Libro();
      libro.libroId = this.fromParent.id;
      venta.libro = libro;
      this.guardar(venta);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }

  guardar(venta: Venta) {
    this.ventaService.guardarVenta(venta).subscribe((x) => {
      console.log(x);
    });
    let timerInterval;
    Swal.fire({
      title: 'Procesando la compra',
      html: 'Espere mientras se completa la transacción',
      timer: 3000,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.closeModal({ compra: true });
      }
    });
  }
}
