import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';


interface LoginResponse {
  success: boolean;
  
}

@Injectable({
  providedIn: 'root'
})

export class ConsumoapiService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }
  
  url: string = 'http://127.0.0.1:5000/';
  username: string | null = null;

  async login(username: string, password: string): Promise<boolean> {
    const data = { user: username, password };
    const response = await this.http.post<any>(this.url+"login", data, this.httpOptions).toPromise();
    return response;
  }

  async recupera(username: string): Promise<boolean> {
    const data = { user: username};
    const response = await this.http.post<any>(this.url+"recuperar", data, this.httpOptions).toPromise();
    return response;
  }

  constructor( private http:HttpClient) {
  
   }
}
