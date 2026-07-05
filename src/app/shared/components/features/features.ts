import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  readonly features = [
    {
      icon: 'assets/images/icon1.png',
      title: 'Monitoreo continuo',
      copy: 'Supervision constante del bienestar mental de los empleados.',
    },
    {
      icon: 'assets/images/icon2.png',
      title: 'Alertas en tiempo real',
      copy: 'Notificaciones personalizadas ante cambios relevantes.',
    },
    {
      icon: 'assets/images/icon3.png',
      title: 'Recomendaciones personalizadas',
      copy: 'Sugerencias basadas en indicadores y analisis de datos.',
    },
  ];
}
