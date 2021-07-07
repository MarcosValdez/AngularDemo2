import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVenderComponent } from './modal-vender.component';

describe('ModalVenderComponent', () => {
  let component: ModalVenderComponent;
  let fixture: ComponentFixture<ModalVenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
