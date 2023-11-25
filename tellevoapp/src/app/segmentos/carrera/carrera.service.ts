import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { DetallesModalComponent } from 'src/app/detalles-modal/detalles-modal.component';
import { ModalController } from '@ionic/angular';
import { CarreraComponent } from './carrera.component';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private viajesSubject = new BehaviorSubject<any[]>([]);
  viajes$ = this.viajesSubject.asObservable();

  private apiUrl = 'http://localhost:5000'

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) { }

  async verDetalles(viaje: any) {
    const modal = await this.modalController.create({
      component: DetallesModalComponent,
      componentProps: { viaje },
    });
  
    await modal.present();
  }


  getViajes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carrera/viajes`);
  }
  

  reducirCapacidad(viaje: any): Observable<any> {
    // Lógica para reducir la capacidad del viaje
    // Puedes implementar esto según tu backend
    const index = this.viajesSubject.value.findIndex(v => v === viaje);
    if (index !== -1) {
      this.viajesSubject.value[index].capacidad = 0;
      this.viajesSubject.next([...this.viajesSubject.value]);
    }
    return this.http.post('http://localhost:5000/carrera/reducir-capacidad', { viaje });
  }
}
