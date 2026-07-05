import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UsuarioService } from '../../../services/usuario';
import { Usuario } from '../../../models/usuario.model';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-editar-usuario',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);

  loading = true;
  saving = false;
  usuarioOriginal!: Usuario;

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    statusUsuario: [true]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.obtenerPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioOriginal = usuario;
        this.form.patchValue({
          nombre: usuario.nombre,
          email: usuario.email,
          username: usuario.username,
          statusUsuario: usuario.statusUsuario
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar el usuario', 'Cerrar', { duration: 3500 });
        this.router.navigate(['/app/usuarios']);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const actualizado: Usuario = {
      ...this.usuarioOriginal,
      ...this.form.value
    };

    this.usuarioService.actualizar(actualizado).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 2500 });
        this.router.navigate(['/app/usuarios']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('No se pudo actualizar el usuario', 'Cerrar', { duration: 3500 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/app/usuarios']);
  }
}