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
  constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

  createAgenda(params: any): Observable<any> {
    return this.http.post(`${this.environmentService.apiUrl}/horario`, params);
  }

  cleanAgenda(params: any): Observable<any> {
    return this.http.post(
      `${this.environmentService.apiUrl}/horario/${params.id_servico}/remover`,
      params
    );
  }
}
