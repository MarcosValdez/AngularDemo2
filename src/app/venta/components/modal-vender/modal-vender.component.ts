import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Libro } from '../../models/libro';
import { LibroService } from '../../service/libro.service';
import { DatosCompradorComponent } from '../datos-comprador/datos-comprador.component';

@Component({
  selector: 'app-modal-vender',
  templateUrl: './modal-vender.component.html',
  styleUrls: ['./modal-vender.component.css'],
})
export class ModalVenderComponent implements OnInit {
  @Input() fromParent;
  libro: Libro;
  constructor(
    public activeModal: NgbActiveModal,
    private libroService: LibroService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerLibro();
  }

  /**
   * Método para cerrar la ventana actual
   * @param sendData Mensaje de confirmación que se envia al componente padre
   */
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  /**
   * Método para obtener los datos de un libro
   */
  obtenerLibro() {
    this.libroService.obtenerLibro(this.fromParent.id).subscribe((x: Libro) => {
      this.libro = x;
    });
  }

  /**
   * Método para abrir el modal de venta del libro
   */
  openModal() {
    const modalRef = this.modalService.open(DatosCompradorComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      size: 'md',
    });
    let data = {
      id: this.fromParent.id,
    };
    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        if (result?.compra) {
          this.closeModal('cerrar');
          Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 2500,
          });
        }
      },
      (reason) => {
        // Intencional
      }
    );
  }
}
