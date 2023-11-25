import { Component, OnInit } from '@angular/core';
import { ViajeService } from './viaje.service';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CarreraService } from '../carrera/carrera.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent  implements OnInit {

  //Propiedades Iniciales
  horaSalida: string = '';
  costoPorPersona: number = 0;
  destinos: string[] = [];
  destinoSeleccionado: string = '';
  capacidad: number = 1; 
  viajes:any[] = [];

  //Limites del precio por persona
  precioMinimo: number = 2999;
  precioMaximo: number = 80001;

  constructor(
    private viajeService: ViajeService,
    private carreraService: CarreraService,
    private http: HttpClient,
    private datePipe: DatePipe,
    public alertController: AlertController
  ) {}

  ngOnInit() {

    this.viajeService.getDestinos().subscribe(
      (destinos) => {
        this.destinos = destinos;
      },
      (error) => {
        console.error('Error al obtener destinos', error);
      }
    );

  }


  crearViaje() {

    if (!this.destinoSeleccionado) {
      this.Alert2_error()
      console.error('Destino es requerido');
      return;
    }

    if (!this.horaSalida) {
      this.Alert3_error()
      console.error('La hora de salida es requerida');
      return;
    }

    const horaActual = new Date();
    const horaIngresada = new Date(this.horaSalida);
    
    if (horaIngresada <= horaActual) {
      console.error('La hora de salida debe ser en el futuro.');
      // Puedes mostrar un mensaje al usuario o manejar la situación de otra manera.
      return;
    }

    // Validacion del precio
    if (this.costoPorPersona <= this.precioMinimo || this.costoPorPersona >= this.precioMaximo) {
      this.Alert4_error()
      console.error('El precio debe estar entre ' + this.precioMinimo + ' y ' + this.precioMaximo);
      
      return;
    }

    // Validacion de capacidad
    if (this.capacidad <= 0 || this.capacidad >= 5) {
      this.Alert5_error
      console.error('La capacidad de transporte debe ser un número entre 1 y 4.');
      return;
    }

    const nuevoViaje = {
      horarioSalida: this.datePipe.transform(new Date(`2000-01-01T${this.horaSalida}:00.000Z`), 'HH:mm'),
      costoPorPersona: this.costoPorPersona,
      destino: this.destinoSeleccionado,
      capacidad: this.capacidad
    };

    // Enviar la información del viaje a la API de Flask
    this.http.post('http://localhost:5000/home/viajes', nuevoViaje)
      .subscribe(
        (response) => {
          console.log(response);
          this.Alert1_val()
          this.carreraService.getViajes();
          //Limpiar los inputs
          this.horaSalida = '';
          this.costoPorPersona = 0;
          this.destinoSeleccionado = '';
          this.capacidad = 1;   
          
          
        },
        (error) => {
          console.error(error);
          this.Alert1_error()
        }
      );

  }



  async Alert1_val(){

    const alert = await this.alertController.create({
      header:"Registro Confirmado",
      message:"Viaje creado exitosamente",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert1_error(){

    const alert = await this.alertController.create({
      header:"Error",
      message:"Datos del viaje incompletos",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert2_error(){

    const alert = await this.alertController.create({
      header:"Error",
      message:"Ingrese un destino disponible",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert3_error(){

    const alert = await this.alertController.create({
      header:"Error",
      message:"Ingrese una hora de salida",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert4_error(){

    const alert = await this.alertController.create({
      header:"Error",
      message:"El monto minimo es $3000 y el maximo es $80000 ",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert5_error(){

    const alert = await this.alertController.create({
      header:"Error",
      message:"La capacidad minima es 1 y la maxina es 4",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };
}
