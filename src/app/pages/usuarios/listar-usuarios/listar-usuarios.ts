import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-listar-usuarios',
  imports: [
    CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css',
})
export class ListarUsuarios implements OnInit {
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['nombre', 'email', 'username', 'roles', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>([]);
  loading = true;

  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    if (mp) this.dataSource.paginator = mp;
  }

  @ViewChild(MatSort) set sort(ms: MatSort) {
    if (ms) this.dataSource.sort = ms;
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la lista de usuarios', 'Cerrar', { duration: 3500 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  toggleEstado(usuario: Usuario): void {
    const actualizado: Usuario = { ...usuario, statusUsuario: !usuario.statusUsuario };
    this.usuarioService.actualizar(actualizado).subscribe({
      next: () => {
        usuario.statusUsuario = actualizado.statusUsuario;
        this.snackBar.open(
          `Usuario ${actualizado.statusUsuario ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2500 }
        );
      },
      error: () => this.snackBar.open('No se pudo actualizar el estado', 'Cerrar', { duration: 3000 })
    });
  }

  eliminar(usuario: Usuario): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '380px',
      data: {
        title: 'Eliminar usuario',
        message: `¿Seguro que deseas eliminar a "${usuario.nombre}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        danger: true
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.usuarioService.eliminar(usuario.idUsuario!).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 2500 });
          this.cargar();
        },
        error: () => this.snackBar.open('No se pudo eliminar el usuario', 'Cerrar', { duration: 3000 })
      });
    });
  }
}