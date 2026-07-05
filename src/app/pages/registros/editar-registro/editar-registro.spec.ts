import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegistro } from './editar-registro';

describe('EditarRegistro', () => {
  let component: EditarRegistro;
  let fixture: ComponentFixture<EditarRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
