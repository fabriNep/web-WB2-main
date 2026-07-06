import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Recomendacion } from '../../../models/recomendacion.model';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { RecomendacionService } from '../../../services/recomendacion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-listar-recomendaciones',
  imports: [
    CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './listar-recomendaciones.html',
  styleUrl: './listar-recomendaciones.css',
})
export class ListarRecomendaciones implements OnInit {
  private recomendacionService = inject(RecomendacionService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Recomendacion>([]);
  loading = true;

  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    if (mp) this.dataSource.paginator = mp;
  }

  @ViewChild(MatSort) set sort(ms: MatSort) {
    if (ms) this.dataSource.sort = ms;
  }

  ngOnInit(): void {
    this.displayedColumns = this.auth.isAdmin()
      ? ['empleado', 'descripcion', 'fecha', 'acciones']
      : ['descripcion', 'fecha'];
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    const fuente$ = this.auth.isAdmin()
      ? this.recomendacionService.listar()
      : this.recomendacionService.misRecomendaciones();

    fuente$.subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la lista de recomendaciones', 'Cerrar', { duration: 3500 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(recomendacion: Recomendacion): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '380px',
      data: {
        title: 'Eliminar recomendación',
        message: '¿Seguro que deseas eliminar esta recomendación? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        danger: true
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.recomendacionService.eliminar(recomendacion.idRecomendacion!).subscribe({
        next: () => {
          this.snackBar.open('Recomendación eliminada', 'Cerrar', { duration: 2500 });
          this.cargar();
        },
        error: () => this.snackBar.open('No se pudo eliminar la recomendación', 'Cerrar', { duration: 3000 })
      });
    });
  }
}
