import { Component, inject, OnInit } from '@angular/core';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Empleado } from '../../../models/empleado.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpleadoService } from '../../../services/empleado';
import { RegistroService } from '../../../services/registro';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-editar-registro',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSliderModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-registro.html',
  styleUrl: './editar-registro.css',
})
export class EditarRegistro implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private registroService = inject(RegistroService);
  private empleadoService = inject(EmpleadoService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  empleados: Empleado[] = [];
  registroOriginal!: RegistroBienestar;

  estadosAnimo = ['Feliz', 'Tranquilo', 'Neutral', 'Estresado', 'Agotado', 'Ansioso'];

  form = this.fb.nonNullable.group({
    idEmpleado: [0, [Validators.required, Validators.min(1)]],
    nivelEstres: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    estadoAnimo: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      registro: this.registroService.obtenerPorId(id),
      empleados: this.empleadoService.listar()
    }).subscribe({
      next: ({ registro, empleados }) => {
        this.registroOriginal = registro;
        this.empleados = empleados;
        this.form.patchValue({
          idEmpleado: registro.empleado?.idEmpleado,
          nivelEstres: registro.nivelEstres,
          estadoAnimo: registro.estadoAnimo,
          fecha: registro.fecha
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar el registro', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/registros']);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const raw = this.form.getRawValue();

    const actualizado: RegistroBienestar = {
      ...this.registroOriginal,
      empleado: { idEmpleado: raw.idEmpleado } as Empleado,
      nivelEstres: raw.nivelEstres,
      estadoAnimo: raw.estadoAnimo,
      fecha: raw.fecha
    };

    this.registroService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Registro actualizado correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/registros']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar el registro (verifica tu rol USER)', 'Cerrar', { duration: 4000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/registros']);
  }
}