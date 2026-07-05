import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertaService } from '../../../services/alerta';
import { RegistroService } from '../../../services/registro';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Alerta } from '../../../models/alerta.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-editar-alerta',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-alerta.html',
  styleUrl: './editar-alerta.css',
})
export class EditarAlerta implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertaService = inject(AlertaService);
  private registroService = inject(RegistroService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  registros: RegistroBienestar[] = [];
  alertaOriginal!: Alerta;

  tiposAlerta = ['Estrés alto', 'Baja participación', 'Riesgo de agotamiento', 'Jornada extensa'];

  form = this.fb.nonNullable.group({
    idRegistro: [0, [Validators.required, Validators.min(1)]],
    tipo: ['', Validators.required],
    mensaje: ['', Validators.required],
    fecha: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      alerta: this.alertaService.obtenerPorId(id),
      registros: this.registroService.listar()
    }).subscribe({
      next: ({ alerta, registros }) => {
        this.alertaOriginal = alerta;
        this.registros = registros;
        this.form.patchValue({
          idRegistro: alerta.registro?.idRegistro,
          tipo: alerta.tipo,
          mensaje: alerta.mensaje,
          fecha: alerta.fecha
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la alerta', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/alertas']);
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

    const actualizado: Alerta = {
      ...this.alertaOriginal,
      registro: { idRegistro: raw.idRegistro } as RegistroBienestar,
      tipo: raw.tipo,
      mensaje: raw.mensaje,
      fecha: raw.fecha
    };

    this.alertaService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Alerta actualizada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/alertas']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar la alerta', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/alertas']);
  }
}
