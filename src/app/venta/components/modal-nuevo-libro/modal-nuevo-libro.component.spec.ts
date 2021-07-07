import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoLibroComponent } from './modal-nuevo-libro.component';

describe('ModalNuevoLibroComponent', () => {
  let component: ModalNuevoLibroComponent;
  let fixture: ComponentFixture<ModalNuevoLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevoLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevoLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
