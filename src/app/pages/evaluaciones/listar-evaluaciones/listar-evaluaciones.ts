import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EvaluacionService } from '../../../services/evaluacion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Evaluacion } from '../../../models/evaluacion.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-listar-evaluaciones',
  imports: [
    CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './listar-evaluaciones.html',
  styleUrl: './listar-evaluaciones.css',
})
export class ListarEvaluaciones implements OnInit {
  private evaluacionService = inject(EvaluacionService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Evaluacion>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.displayedColumns = this.auth.isAdmin()
      ? ['empleado', 'pregunta', 'respuesta', 'fecha', 'acciones']
      : ['pregunta', 'respuesta', 'fecha', 'acciones'];
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    const fuente$ = this.auth.isAdmin()
      ? this.evaluacionService.listar()
      : this.evaluacionService.misEvaluaciones();

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
        this.snackBar.open('No se pudo cargar la lista de evaluaciones', 'Cerrar', { duration: 3500 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(evaluacion: Evaluacion): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '380px',
      data: {
        title: 'Eliminar evaluación',
        message: '¿Seguro que deseas eliminar esta evaluación? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        danger: true
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.evaluacionService.eliminar(evaluacion.idEvaluacion!).subscribe({
        next: () => {
          this.snackBar.open('Evaluación eliminada', 'Cerrar', { duration: 2500 });
          this.cargar();
        },
        error: () => this.snackBar.open('No se pudo eliminar la evaluación', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
