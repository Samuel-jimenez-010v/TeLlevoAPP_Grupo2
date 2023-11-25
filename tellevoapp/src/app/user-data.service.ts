import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private usuarioActualSubject = new BehaviorSubject<any>(null);
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  guardarUsuarioActual(usuario: any) {
    this.usuarioActualSubject.next(usuario);
  }
}