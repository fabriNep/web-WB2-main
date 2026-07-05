import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado';
import { UsuarioService } from '../../../services/usuario';
import { EmpresaService } from '../../../services/empresa';
import { Empleado } from '../../../models/empleado.model';
import { Empresa } from '../../../models/empresa.model';
import { Usuario } from '../../../models/usuario.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editar-empleado',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-empleado.html',
  styleUrl: './editar-empleado.css',
})
export class EditarEmpleado implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empleadoService = inject(EmpleadoService);
  private usuarioService = inject(UsuarioService);
  private empresaService = inject(EmpresaService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  usuarios: Usuario[] = [];
  empresas: Empresa[] = [];
  empleadoOriginal!: Empleado;

  form = this.fb.nonNullable.group({
    idUsuario: [0, [Validators.required, Validators.min(1)]],
    idEmpresa: [0, [Validators.required, Validators.min(1)]],
    cargo: ['', Validators.required],
    estado: [true]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin({
      empleado: this.empleadoService.obtenerPorId(id),
      usuarios: this.usuarioService.listar(),
      empresas: this.empresaService.listar()
    }).subscribe({
      next: ({ empleado, usuarios, empresas }) => {
        this.empleadoOriginal = empleado;
        this.usuarios = usuarios;
        this.empresas = empresas;
        this.form.patchValue({
          idUsuario: empleado.usuario?.idUsuario,
          idEmpresa: empleado.empresa?.idEmpresa,
          cargo: empleado.cargo,
          estado: empleado.estado
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar el empleado', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/empleados']);
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

    const actualizado: Empleado = {
      ...this.empleadoOriginal,
      usuario: { idUsuario: raw.idUsuario } as Usuario,
      empresa: { idEmpresa: raw.idEmpresa } as Empresa,
      cargo: raw.cargo,
      estado: raw.estado
    };

    this.empleadoService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Empleado actualizado correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/empleados']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar el empleado', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/empleados']);
  }
}
