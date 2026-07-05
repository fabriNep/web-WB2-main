import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlertas } from './listar-alertas';

describe('ListarAlertas', () => {
  let component: ListarAlertas;
  let fixture: ComponentFixture<ListarAlertas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAlertas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAlertas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
