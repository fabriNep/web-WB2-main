import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RecomendacionService } from '../../../services/recomendacion';
import { RegistroService } from '../../../services/registro';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Recomendacion } from '../../../models/recomendacion.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-editar-recomendacion',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-recomendacion.html',
  styleUrl: './editar-recomendacion.css',
})
export class EditarRecomendacion implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recomendacionService = inject(RecomendacionService);
  private registroService = inject(RegistroService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  registros: RegistroBienestar[] = [];
  recomendacionOriginal!: Recomendacion;

  form = this.fb.nonNullable.group({
    idRegistro: [0, [Validators.required, Validators.min(1)]],
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      recomendacion: this.recomendacionService.obtenerPorId(id),
      registros: this.registroService.listar()
    }).subscribe({
      next: ({ recomendacion, registros }) => {
        this.recomendacionOriginal = recomendacion;
        this.registros = registros;
        this.form.patchValue({
          idRegistro: recomendacion.registro?.idRegistro,
          descripcion: recomendacion.descripcion,
          fecha: recomendacion.fecha
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la recomendación', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/recomendaciones']);
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

    const actualizado: Recomendacion = {
      ...this.recomendacionOriginal,
      registro: { idRegistro: raw.idRegistro } as RegistroBienestar,
      descripcion: raw.descripcion,
      fecha: raw.fecha
    };

    this.recomendacionService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Recomendación actualizada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/recomendaciones']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar la recomendación', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/recomendaciones']);
  }
}
