import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../../../services/chatbot';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InteraccionChatbot } from '../../../models/interaccion-chatbot.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


interface Mensaje {
  autor: 'user' | 'bot';
  texto: string;
}

@Component({
  selector: 'app-chatbot',
  imports: [
    CommonModule, FormsModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule
  ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements OnInit, AfterViewChecked {
  private chatbotService = inject(ChatbotService);
  private snackBar = inject(MatSnackBar);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  loadingHistorial = true;
  enviando = false;
  mensajeInput = '';
  mensajes: Mensaje[] = [];

  ngOnInit(): void {
    this.chatbotService.misConversaciones().subscribe({
      next: (historial: InteraccionChatbot[]) => {
        this.mensajes = historial.flatMap(h => [
          { autor: 'user' as const, texto: h.mensajeUsuario },
          { autor: 'bot' as const, texto: h.respuestaBot }
        ]);
        this.loadingHistorial = false;
      },
      error: () => {
        this.loadingHistorial = false;
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollAlFinal();
  }

  enviar(): void {
    const texto = this.mensajeInput.trim();
    if (!texto || this.enviando) return;

    this.mensajes.push({ autor: 'user', texto });
    this.mensajeInput = '';
    this.enviando = true;

    this.chatbotService.enviarMensaje(texto).subscribe({
      next: (respuesta) => {
        this.mensajes.push({ autor: 'bot', texto: respuesta.respuestaBot });
        this.enviando = false;
      },
      error: () => {
        this.enviando = false;
        this.snackBar.open('No se pudo enviar el mensaje. Intenta de nuevo.', 'Cerrar', { duration: 3500 });
      }
    });
  }

  private scrollAlFinal(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch { }
  }
}
