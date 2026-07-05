import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  readonly benefits = [
    {
      icon: 'assets/images/Monitoreo.png',
      title: 'Monitoreo continuo',
      copy: 'Centraliza indicadores de bienestar, participacion y carga laboral para observar tendencias de cada equipo sin perder contexto.',
    },
    {
      icon: 'assets/images/ALERTAS.png',
      title: 'Alertas en tiempo real',
      copy: 'Detecta patrones de riesgo y prioriza casos que requieren seguimiento de RR.HH. o supervisores autorizados.',
    },
    {
      icon: 'assets/images/Recomendaciones.png',
      title: 'Recomendaciones personalizadas',
      copy: 'Propone acciones preventivas, descansos, recursos y actividades de bienestar segun el estado del equipo.',
    },
    {
      icon: 'assets/images/icon4.png',
      title: 'Recursos de salud mental',
      copy: 'Organiza articulos, guias y materiales que pueden compartirse por correo corporativo con empleados seleccionados.',
    },
  ];
}
