import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluaciones } from './listar-evaluaciones';

describe('ListarEvaluaciones', () => {
  let component: ListarEvaluaciones;
  let fixture: ComponentFixture<ListarEvaluaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEvaluaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEvaluaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
