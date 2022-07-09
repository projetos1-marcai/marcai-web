import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    baseUrl = "https://marcai-projetos1-prod.herokuapp.com/service/";

    //search/lui

    constructor(private http: HttpClient) { }

    findAll(): Observable<Service[]> {
        return this.http.get<Service[]>("https://marcai-projetos1-prod.herokuapp.com/services")
    }

    findBySubstring(substring: String): Observable<Service[]> {
        return this.http.get<{ services: Service[] }>(`https://marcai-projetos1-prod.herokuapp.com/service/search/${substring}`).pipe(
            map(data => data.services)
        );
    }

} 