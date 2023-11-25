// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioActual: any;

  private isAuthenticated = false;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {
    // Al inicializar el servicio, intentamos obtener el token almacenado en localStorage
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      // Si hay un token almacenado, configuramos la autenticación y guardamos el token
      this.isAuthenticated = true;
      this.token = storedToken;
    }
  }

  set token(value: string | null) {
    // Al establecer el token, actualizamos el estado de autenticación y almacenamos en localStorage
    this.isAuthenticated = !!value;
    if (value) {
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  get token(): string | null {
    // Devuelve el token actual
    return localStorage.getItem(this.tokenKey);
  }

  auth(){
    this.isAuthenticated = true;
  }

  setUsuarioActual(usuario: any) {
    this.usuarioActual = usuario;
  }

  getNombreUsuario(): string {
    return this.usuarioActual ? this.usuarioActual.nombre : '';
  }

  obtenerUsuarioActual(): Observable<any> {
    if (this.isAuthenticated) {
      // Configura las cabeceras con el token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      });

      // Realiza la solicitud al backend
      return this.http.get<any>('http://localhost:5000/usuario-actual', { headers }).pipe(
        tap((usuario) => this.setUsuarioActual(usuario)),
        catchError(this.handleError<any>('obtenerUsuarioActual', {}))
      );
    } else {
      // Si no está autenticado, devolvemos un observable vacío
      return of({});
    }
  }
  
  logout(): void {
    // Al cerrar sesión, limpiamos el token y la información del usuario
    this.token = null;
    this.usuarioActual = null;
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
}

