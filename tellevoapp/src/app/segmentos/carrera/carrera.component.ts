import { Component, OnInit } from '@angular/core';
import { CarreraService } from './carrera.service';
import { IonRefresher } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetallesModalComponent } from 'src/app/detalles-modal/detalles-modal.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.scss'],
})
export class CarreraComponent implements OnInit {

  viajesDisponibles: any[] = [];
  viajes: any[] = [];

  constructor(
    private carreraService: CarreraService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carreraService.getViajes().subscribe(
      (viajes) => {
        console.log('Lista de viajes:', viajes);
        this.viajes = viajes;
      },
      (error) => {
        console.error('Error al obtener viajes', error);
      }
    );

  }

  doRefresh(event: any) {
    // Lógica para recargar los viajes
    this.carreraService.getViajes().subscribe(
      (viajes) => {
        console.log('Viajes recargados con éxito', viajes);
        this.viajes = viajes;
        // Completa el evento de actualización
        event.detail.complete();
      },
      (error) => {
        console.error('Error al recargar viajes', error);
        // Manejar errores si es necesario
        // Completa el evento de actualización en caso de error también
        event.detail.complete();
      }
    );
  }

  async verDetalles(viaje: any) {
    const modal = await this.modalController.create({
      component: DetallesModalComponent, // Crea un componente modal para los detalles
      componentProps: { viaje }, // Pasa el objeto viaje como propiedad al componente modal
    });

    await modal.present();
  }

  confirmarViaje(viaje: any) {
    this.reducirCapacidad(viaje);

    // Cierra el modal
    this.cerrarModal();
  }

  reducirCapacidad(viaje: any) {
    // Lógica para reducir la capacidad del viaje
    this.carreraService.reducirCapacidad(viaje).subscribe(
      (response) => {
        console.log('Capacidad reducida con éxito', response);
        // Lógica adicional después de reducir la capacidad
      },
      (error) => {
        console.error('Error al reducir la capacidad', error);
        // Manejar errores si es necesario
      }
    );
  }

  cerrarModal(){
    this.modalController.dismiss();
  }


}
