import { Observable } from 'rxjs';
import { EnvironmentService } from './../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  api: string = environment.apiUrl;
  constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

  createAgenda(params: any): Observable<any> {
    return this.http.post(`${this.environmentService.apiUrl}/horario`, params);
  }

  cleanAgenda(params: any): Observable<any> {
    return this.http.post(
      `${this.environmentService.apiUrl}/horario/${params.id_agenda}/remover`,
      params
    );
  }

  getHorario(id: any): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/horario/${id}`);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/agenda/usuario/reservas`);
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/agenda/reserva/${id}`);
  }
}
