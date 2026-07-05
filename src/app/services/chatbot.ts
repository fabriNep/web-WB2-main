import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InteraccionChatbot } from '../models/interaccion-chatbot.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/chatbot`;

  misConversaciones(): Observable<InteraccionChatbot[]> {
    return this.http.get<InteraccionChatbot[]>(`${this.baseUrl}/mis-conversaciones`);
  }

  enviarMensaje(mensaje: string): Observable<InteraccionChatbot> {
    return this.http.post<InteraccionChatbot>(`${this.baseUrl}/enviar`, { mensaje });
  }
}
