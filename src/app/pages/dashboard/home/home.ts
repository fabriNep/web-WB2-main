import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { RegistroService } from '../../../services/registro';
import { AlertaService } from '../../../services/alerta';
import { RecomendacionService } from '../../../services/recomendacion';
import { UsuarioService } from '../../../services/usuario';
import { EmpresaService } from '../../../services/empresa';
import { EmpleadoService } from '../../../services/empleado';
import { RegistroBienestar } from '../../../models/registro-bienestar.model';
import { Recomendacion } from '../../../models/recomendacion.model';
import { Alerta } from '../../../models/alerta.model';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  auth = inject(AuthService);
  private registroService = inject(RegistroService);
  private alertaService = inject(AlertaService);
  private recomendacionService = inject(RecomendacionService);
  private usuarioService = inject(UsuarioService);
  private empresaService = inject(EmpresaService);
  private empleadoService = inject(EmpleadoService);

  loading = true;

  totalUsuarios = 0;
  totalEmpresas = 0;
  totalEmpleados = 0;

  misRegistros: RegistroBienestar[] = [];
  misAlertas: Alerta[] = [];
  misRecomendaciones: Recomendacion[] = [];

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.cargarDashboardAdmin();
    } else {
      this.cargarDashboardUser();
    }
  }

  private cargarDashboardAdmin(): void {
    forkJoin({
      usuarios: this.usuarioService.listar(),
      empresas: this.empresaService.listar(),
      empleados: this.empleadoService.listar()
    }).subscribe({
      next: ({ usuarios, empresas, empleados }) => {
        this.totalUsuarios = usuarios.length;
        this.totalEmpresas = empresas.length;
        this.totalEmpleados = empleados.length;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  private cargarDashboardUser(): void {
    forkJoin({
      registros: this.registroService.misRegistros(),
      alertas: this.alertaService.misAlertas(),
      recomendaciones: this.recomendacionService.misRecomendaciones()
    }).subscribe({
      next: ({ registros, alertas, recomendaciones }) => {
        this.misRegistros = registros;
        this.misAlertas = alertas;
        this.misRecomendaciones = recomendaciones;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  get ultimoRegistro(): RegistroBienestar | null {
    if (!this.misRegistros.length) return null;
    return [...this.misRegistros].sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  }
}
