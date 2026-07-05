import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpleado } from './crear-empleado';

describe('CrearEmpleado', () => {
  let component: CrearEmpleado;
  let fixture: ComponentFixture<CrearEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
