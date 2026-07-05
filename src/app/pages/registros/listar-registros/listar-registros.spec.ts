import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistros } from './listar-registros';

describe('ListarRegistros', () => {
  let component: ListarRegistros;
  let fixture: ComponentFixture<ListarRegistros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarRegistros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRegistros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
