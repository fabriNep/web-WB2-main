import { Component, inject } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpresaService } from '../../../services/empresa';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crear-empresa',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-empresa.html',
  styleUrl: './crear-empresa.css',
})
export class CrearEmpresa {
  private fb = inject(FormBuilder);
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = false;

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    rubro: ['', Validators.required],
    estado: [true]
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const empresa: Empresa = this.form.getRawValue();

    this.empresaService.crear(empresa).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Empresa creada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/empresas']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear la empresa', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/empresas']);
  }
}
