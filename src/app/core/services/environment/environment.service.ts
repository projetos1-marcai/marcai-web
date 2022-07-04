import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  production: boolean = environment.production;
  apiUrl: string = environment.apiUrl;

  constructor() {}
}
