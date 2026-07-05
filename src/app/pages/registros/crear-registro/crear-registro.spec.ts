import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistro } from './crear-registro';

describe('CrearRegistro', () => {
  let component: CrearRegistro;
  let fixture: ComponentFixture<CrearRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
