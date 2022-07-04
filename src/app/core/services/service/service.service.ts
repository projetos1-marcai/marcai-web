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

  getServices(): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/services`);
  }

  getService(id: any): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/service/id/${id}`);
  }
}
