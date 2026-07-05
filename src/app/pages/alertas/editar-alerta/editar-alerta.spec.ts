import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlerta } from './editar-alerta';

describe('EditarAlerta', () => {
  let component: EditarAlerta;
  let fixture: ComponentFixture<EditarAlerta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlerta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlerta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
