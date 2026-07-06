import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AlertaService } from '../../../services/alerta';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Alerta } from '../../../models/alerta.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-listar-alertas',
  imports: [
    CommonModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule,
    MatTooltipModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './listar-alertas.html',
  styleUrl: './listar-alertas.css',
})
export class ListarAlertas implements OnInit {
  private alertaService = inject(AlertaService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Alerta>([]);
  loading = true;

  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    if (mp) this.dataSource.paginator = mp;
  }

  @ViewChild(MatSort) set sort(ms: MatSort) {
    if (ms) this.dataSource.sort = ms;
  }

  ngOnInit(): void {
    this.displayedColumns = this.auth.isAdmin()
      ? ['empleado', 'tipo', 'mensaje', 'fecha', 'acciones']
      : ['tipo', 'mensaje', 'fecha'];
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    const fuente$ = this.auth.isAdmin()
      ? this.alertaService.listar()
      : this.alertaService.misAlertas();

    fuente$.subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('No se pudo cargar la lista de alertas', 'Cerrar', { duration: 3500 });
      }
    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(alerta: Alerta): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '380px',
      data: {
        title: 'Eliminar alerta',
        message: '¿Seguro que deseas eliminar esta alerta? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        danger: true
      }
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.alertaService.eliminar(alerta.idAlerta!).subscribe({
        next: () => {
          this.snackBar.open('Alerta eliminada', 'Cerrar', { duration: 2500 });
          this.cargar();
        },
        error: () => this.snackBar.open('No se pudo eliminar la alerta', 'Cerrar', { duration: 3000 })
      });
    });
  }
}