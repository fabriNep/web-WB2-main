import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecomendacionService } from '../../../services/recomendacion';
import { RegistroService } from '../../../services/registro';
import { Router, RouterModule } from '@angular/router';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Recomendacion } from '../../../models/recomendacion.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crear-recomendacion',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-recomendacion.html',
  styleUrl: './crear-recomendacion.css',
})
export class CrearRecomendacion implements OnInit {
  private fb = inject(FormBuilder);
  private recomendacionService = inject(RecomendacionService);
  private registroService = inject(RegistroService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  loadingOptions = true;
  saving = false;
  registros: RegistroBienestar[] = [];

  form = this.fb.nonNullable.group({
    idRegistro: [0, [Validators.required, Validators.min(1)]],
    descripcion: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required]
  });

  ngOnInit(): void {
    this.registroService.listar().subscribe({
      next: (data) => {
        this.registros = data;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
        this.snackBar.open('No se pudieron cargar los registros', 'Cerrar', { duration: 3500 });
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

    const recomendacion: Recomendacion = {
      registro: { idRegistro: raw.idRegistro } as RegistroBienestar,
      descripcion: raw.descripcion,
      fecha: raw.fecha
    };

    this.recomendacionService.crear(recomendacion).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Recomendación creada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/recomendaciones']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear la recomendación', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/recomendaciones']);
  }
}