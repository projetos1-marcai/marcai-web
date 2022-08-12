import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from './../environment/environment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

  login(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, params);
  }

  register(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, params);
  }
}
