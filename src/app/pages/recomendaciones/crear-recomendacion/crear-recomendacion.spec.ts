import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecomendacion } from './crear-recomendacion';

describe('CrearRecomendacion', () => {
  let component: CrearRecomendacion;
  let fixture: ComponentFixture<CrearRecomendacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRecomendacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRecomendacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
