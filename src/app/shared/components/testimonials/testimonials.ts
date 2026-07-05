import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  readonly testimonials = [
    {
      image: 'assets/images/Testimony1.png',
      quote:
        'WellnessBuddy nos ha permitido monitorear el bienestar de nuestros empleados de manera proactiva. Desde que implementamos la plataforma, hemos reducido las bajas por estres en un 30%.',
      name: 'Ana Martinez, Directora de Recursos Humanos en XYZ Corp',
    },
    {
      image: 'assets/images/Testimony2.png',
      quote:
        'Las alertas en tiempo real y las recomendaciones personalizadas han mejorado significativamente la moral de nuestro equipo.',
      name: 'Carlos Lopez, CEO de Innovate Tech',
    },
    {
      image: 'assets/images/Testimony3.png',
      quote:
        'Hemos podido detectar y prevenir problemas antes de que se agraven. La plataforma es clave para el bienestar de nuestra empresa.',
      name: 'Sofia Garcia, Gerente de Bienestar en CorpSalud',
    },
  ];
}
