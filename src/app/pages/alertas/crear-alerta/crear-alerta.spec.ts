import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlerta } from './crear-alerta';

describe('CrearAlerta', () => {
  let component: CrearAlerta;
  let fixture: ComponentFixture<CrearAlerta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAlerta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAlerta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
