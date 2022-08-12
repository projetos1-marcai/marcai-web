import { EnvironmentService } from './../environment/environment.service';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  api: string = environment.apiUrl;
  constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

  getService(id: any): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/service/id/${id}`);
  }

  deleteService(id: any): Observable<any> {
    return this.http.delete(`${this.environmentService.apiUrl}/service/id/${id}`);
  }

  createService(params: any): Observable<any> {
    return this.http.post(`${this.environmentService.apiUrl}/service`, params);
  }

  updateService(id: any, params: any): Observable<any> {
    return this.http.put(`${this.environmentService.apiUrl}/service/${id}`, params);
  }

  searchService(query: any): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/service/search/${query}`);
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/services`);
  }
}
