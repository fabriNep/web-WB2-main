import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado';
import { EmpresaService } from '../../../services/empresa';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Empresa } from '../../../models/empresa.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-completar-perfil',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './completar-perfil.html',
  styleUrl: './completar-perfil.css',
})
export class CompletarPerfil implements OnInit {
  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadingOptions = true;
  saving = false;
  empresas: Empresa[] = [];

  form = this.fb.nonNullable.group({
    idEmpresa: [0, [Validators.required, Validators.min(1)]],
    cargo: ['', Validators.required]
  });

  ngOnInit(): void {
    this.empresaService.listar().subscribe({
      next: (data) => {
        this.empresas = data;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
        this.snackBar.open('No se pudieron cargar las empresas', 'Cerrar', { duration: 3500 });
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.empleadoService.completarPerfil(this.form.getRawValue()).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('¡Perfil completado! Bienvenido a WellnessBuddy.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/app/dashboard']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo completar tu perfil. Intenta de nuevo.', 'Cerrar', { duration: 3500 });
      }
    });
  }
}