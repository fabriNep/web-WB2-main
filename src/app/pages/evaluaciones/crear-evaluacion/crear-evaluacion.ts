import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvaluacionService } from '../../../services/evaluacion';
import { EmpleadoService } from '../../../services/empleado';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth';
import { Empleado } from '../../../models/empleado.model';
import { Evaluacion } from '../../../models/evaluacion.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crear-evaluacion',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-evaluacion.html',
  styleUrl: './crear-evaluacion.css',
})
export class CrearEvaluacion implements OnInit {
  private fb = inject(FormBuilder);
  private evaluacionService = inject(EvaluacionService);
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  loadingOptions = true;
  saving = false;
  empleados: Empleado[] = [];
  miEmpleado?: Empleado;

  preguntasSugeridas = [
    '¿Cómo describirías tu carga laboral esta semana?',
    '¿Sientes que tienes equilibrio entre tu vida laboral y personal?',
    '¿Qué tan apoyado te sientes por tu equipo?',
    '¿Has notado cambios en tu nivel de energía últimamente?'
  ];

  form = this.fb.nonNullable.group({
    idEmpleado: [0, [Validators.required, Validators.min(1)]],
    pregunta: ['', Validators.required],
    respuesta: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required]
  });

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.empleadoService.listar().subscribe({
        next: (data) => {
          this.empleados = data;
          this.loadingOptions = false;
        },
        error: () => {
          this.loadingOptions = false;
          this.snackBar.open('No se pudieron cargar los empleados', 'Cerrar', { duration: 3500 });
        }
      });
    } else {
      this.empleadoService.miPerfil().subscribe({
        next: (empleado) => {
          this.miEmpleado = empleado;
          this.form.patchValue({ idEmpleado: empleado.idEmpleado });
          this.loadingOptions = false;
        },
        error: () => {
          this.loadingOptions = false;
          this.snackBar.open('Debes completar tu perfil laboral primero', 'Cerrar', { duration: 3500 });
          this.router.navigate(['/completar-perfil']);
        }
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const raw = this.form.getRawValue();

    const evaluacion: Evaluacion = {
      empleado: { idEmpleado: raw.idEmpleado } as Empleado,
      pregunta: raw.pregunta,
      respuesta: raw.respuesta,
      fecha: raw.fecha
    };

    this.evaluacionService.crear(evaluacion).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Evaluación creada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/evaluaciones']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear la evaluación', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/evaluaciones']);
  }
}
