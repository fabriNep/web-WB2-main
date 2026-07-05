import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RegistroService } from '../../../services/registro';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-listar-registros',
  imports: [
    CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './listar-registros.html',
  styleUrl: './listar-registros.css',
})
export class ListarRegistros implements OnInit {
  private registroService = inject(RegistroService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<RegistroBienestar>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.displayedColumns = this.auth.isAdmin()
      ? ['empleado', 'nivelEstres', 'estadoAnimo', 'fecha', 'acciones']
      : ['nivelEstres', 'estadoAnimo', 'fecha', 'acciones'];
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    const fuente$ = this.auth.isAdmin()
      ? this.registroService.listar()
      : this.registroService.misRegistros();

    fuente$.subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la lista de registros', 'Cerrar', { duration: 3500 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nivelClase(nivel: number): string {
    if (nivel > 7) return 'chip-alto';
    if (nivel > 4) return 'chip-medio';
    return 'chip-bajo';
  }

  eliminar(registro: RegistroBienestar): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '380px',
      data: {
        title: 'Eliminar registro',
        message: '¿Seguro que deseas eliminar este registro de bienestar? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        danger: true
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.registroService.eliminar(registro.idRegistro!).subscribe({
        next: () => {
          this.snackBar.open('Registro eliminado', 'Cerrar', { duration: 2500 });
          this.cargar();
        },
        error: () => this.snackBar.open('No se pudo eliminar el registro', 'Cerrar', { duration: 3000 })
      });
    });
  }
}