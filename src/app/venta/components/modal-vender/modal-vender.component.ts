import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';

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
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    this.obtenerLibro();
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  obtenerLibro() {
    this.libroService.obtenerLibro(this.fromParent.id).subscribe((x: Libro) => {
      console.log(x);
      this.libro = x;
    });
  }
}
