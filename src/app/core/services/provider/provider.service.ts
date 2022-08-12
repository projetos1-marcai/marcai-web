import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  api: string = environment.apiUrl;
  constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

  getProvider(id: any): Observable<any> {
    return this.http.get(`${this.environmentService.apiUrl}/user/${id}`);
  }
}
