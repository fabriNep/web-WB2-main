import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpresas } from './listar-empresas';

describe('ListarEmpresas', () => {
  let component: ListarEmpresas;
  let fixture: ComponentFixture<ListarEmpresas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEmpresas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEmpresas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
