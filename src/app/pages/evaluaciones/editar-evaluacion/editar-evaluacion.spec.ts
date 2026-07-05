import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvaluacion } from './editar-evaluacion';

describe('EditarEvaluacion', () => {
  let component: EditarEvaluacion;
  let fixture: ComponentFixture<EditarEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
