import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AlertaService } from '../../../services/alerta';
import { RegistroService } from '../../../services/registro';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Alerta } from '../../../models/alerta.model';

@Component({
  selector: 'app-crear-alerta',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-alerta.html',
  styleUrl: './crear-alerta.css',
})
export class CrearAlerta implements OnInit {
  private fb = inject(FormBuilder);
  private alertaService = inject(AlertaService);
  private registroService = inject(RegistroService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadingOptions = true;
  saving = false;
  registros: RegistroBienestar[] = [];

  tiposAlerta = ['Estrés alto', 'Baja participación', 'Riesgo de agotamiento', 'Jornada extensa'];

  form = this.fb.nonNullable.group({
    idRegistro: [0, [Validators.required, Validators.min(1)]],
    tipo: ['', Validators.required],
    mensaje: ['', Validators.required],
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

    const alerta: Alerta = {
      registro: { idRegistro: raw.idRegistro } as RegistroBienestar,
      tipo: raw.tipo,
      mensaje: raw.mensaje,
      fecha: raw.fecha
    };

    this.alertaService.crear(alerta).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Alerta creada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/alertas']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear la alerta', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/alertas']);
  }
}
