import { Component, inject, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpresaService } from '../../../services/empresa';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-editar-empresa',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-empresa.html',
  styleUrl: './editar-empresa.css',
})
export class EditarEmpresa implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  empresaOriginal!: Empresa;

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    rubro: ['', Validators.required],
    estado: [true]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.empresaService.obtenerPorId(id).subscribe({
      next: (empresa) => {
        this.empresaOriginal = empresa;
        this.form.patchValue({
          nombre: empresa.nombre,
          rubro: empresa.rubro,
          estado: empresa.estado
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la empresa', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/empresas']);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const actualizado: Empresa = { ...this.empresaOriginal, ...this.form.getRawValue() };

    this.empresaService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Empresa actualizada correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/empresas']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar la empresa', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/empresas']);
  }
}
