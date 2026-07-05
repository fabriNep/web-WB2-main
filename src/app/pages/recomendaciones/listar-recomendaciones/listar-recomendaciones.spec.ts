import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecomendaciones } from './listar-recomendaciones';

describe('ListarRecomendaciones', () => {
  let component: ListarRecomendaciones;
  let fixture: ComponentFixture<ListarRecomendaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarRecomendaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRecomendaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
