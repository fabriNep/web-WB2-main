import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado';
import { UsuarioService } from '../../../services/usuario';
import { EmpresaService } from '../../../services/empresa';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario.model';
import { Empresa } from '../../../models/empresa.model';
import { forkJoin } from 'rxjs';
import { Empleado } from '../../../models/empleado.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-crear-empleado',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './crear-empleado.html',
  styleUrl: './crear-empleado.css',
})
export class CrearEmpleado implements OnInit {
  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);
  private usuarioService = inject(UsuarioService);
  private empresaService = inject(EmpresaService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadingOptions = true;
  saving = false;
  usuarios: Usuario[] = [];
  empresas: Empresa[] = [];

  form = this.fb.nonNullable.group({
    idUsuario: [0, [Validators.required, Validators.min(1)]],
    idEmpresa: [0, [Validators.required, Validators.min(1)]],
    cargo: ['', Validators.required],
    estado: [true]
  });

  ngOnInit(): void {
    forkJoin({
      usuarios: this.usuarioService.listar(),
      empresas: this.empresaService.listar()
    }).subscribe({
      next: ({ usuarios, empresas }) => {
        this.usuarios = usuarios;
        this.empresas = empresas;
        this.loadingOptions = false;
      },
      error: () => {
        this.loadingOptions = false;
        this.snackBar.open('No se pudieron cargar usuarios/empresas', 'Cerrar', { duration: 3500 });
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

    const empleado: Empleado = {
      usuario: { idUsuario: raw.idUsuario } as Usuario,
      empresa: { idEmpresa: raw.idEmpresa } as Empresa,
      cargo: raw.cargo,
      estado: raw.estado
    };

    this.empleadoService.crear(empleado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Empleado creado correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/empleados']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo crear el empleado', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/empleados']);
  }
}
