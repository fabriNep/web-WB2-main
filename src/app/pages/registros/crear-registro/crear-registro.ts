import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from '../../../models/empleado.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado';
import { RegistroService } from '../../../services/registro';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crear-registro',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSliderModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-registro.html',
  styleUrl: './crear-registro.css',
})
export class CrearRegistro implements OnInit {
  private fb = inject(FormBuilder);
  private registroService = inject(RegistroService);
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadingOptions = true;
  saving = false;
  miEmpleado?: Empleado;

  estadosAnimo = ['Feliz', 'Tranquilo', 'Neutral', 'Estresado', 'Agotado', 'Ansioso'];

  form = this.fb.nonNullable.group({
    nivelEstres: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    estadoAnimo: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required]
  });

  ngOnInit(): void {
    this.empleadoService.miPerfil().subscribe({
      next: (empleado) => {
        this.miEmpleado = empleado;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
        this.snackBar.open('Debes completar tu perfil laboral primero', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/completar-perfil']);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid || !this.miEmpleado) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const raw = this.form.getRawValue();

    const registro: RegistroBienestar = {
      empleado: { idEmpleado: this.miEmpleado.idEmpleado } as Empleado,
      nivelEstres: raw.nivelEstres,
      estadoAnimo: raw.estadoAnimo,
      fecha: raw.fecha
    };

    this.registroService.crear(registro).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Registro creado correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/registros']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear el registro', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/registros']);
  }
}
