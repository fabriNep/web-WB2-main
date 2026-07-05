import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly channels = [
    {
      image: 'assets/images/image1.png',
      title: 'Explora MindCare',
      copy: 'Nuestra plataforma web para bienestar corporativo.',
    },
    {
      image: 'assets/images/image2.png',
      title: 'Asistencia al cliente',
      copy: 'Pide ayuda a nuestros colaboradores.',
    },
    {
      image: 'assets/images/image3.png',
      title: 'Correo electronico',
      copy: 'wellnesssupport@yahoo.com',
      extra: 'service.wellnes@gmail.com',
    },
  ];
}