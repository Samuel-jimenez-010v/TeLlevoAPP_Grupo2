import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarreraComponent } from '../segmentos/carrera/carrera.component';
import { CarreraService } from '../segmentos/carrera/carrera.service';


@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.component.html',
  styleUrls: ['./detalles-modal.component.scss'],
})
export class DetallesModalComponent  implements OnInit {

  @Input() viaje: any; // Asegúrate de que el tipo coincida con el objeto que estás pasando
  nombreConductor = "";

  constructor(
    private modalController:ModalController, 
    private carreraService: CarreraService,
    private carreraComponet: CarreraComponent) { }

  ngOnInit() {}

  confirmarViaje(viaje: any) {
    // Realiza la lógica necesaria aquí para reducir la capacidad a 0
    // (puede implicar una llamada a la API, dependiendo de tu implementación)
    this.reducirCapacidad(viaje);
    this.carreraService.getViajes();
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
