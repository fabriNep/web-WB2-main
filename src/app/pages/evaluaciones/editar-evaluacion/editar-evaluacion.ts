import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvaluacionService } from '../../../services/evaluacion';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Evaluacion } from '../../../models/evaluacion.model';

@Component({
  selector: 'app-editar-evaluacion',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-evaluacion.html',
  styleUrl: './editar-evaluacion.css',
})
export class EditarEvaluacion implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private evaluacionService = inject(EvaluacionService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  evaluacionOriginal!: Evaluacion;

  form = this.fb.nonNullable.group({
    pregunta: ['', Validators.required],
    respuesta: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evaluacionService.obtenerPorId(id).subscribe({
      next: (evaluacion) => {
        this.evaluacionOriginal = evaluacion;
        this.form.patchValue({
          pregunta: evaluacion.pregunta,
          respuesta: evaluacion.respuesta,
          fecha: evaluacion.fecha
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la evaluación', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/evaluaciones']);
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

    const actualizado: Evaluacion = {
      ...this.evaluacionOriginal,
      pregunta: raw.pregunta,
      respuesta: raw.respuesta,
      fecha: raw.fecha
    };

    this.evaluacionService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Evaluación actualizada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/evaluaciones']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar la evaluación', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/evaluaciones']);
  }
}
