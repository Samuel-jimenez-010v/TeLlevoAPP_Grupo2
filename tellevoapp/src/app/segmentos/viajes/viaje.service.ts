import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private apiUrl = 'http://localhost:5000';

  constructor(
    private http: HttpClient
  ) { }

  getDestinos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/destinos`);
  }



}

