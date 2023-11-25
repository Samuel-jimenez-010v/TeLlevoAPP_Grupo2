import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ConsumoapiService } from '../consumoapi.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage{

  logindata: any = {
    username: ''
  }
  
  constructor(
    public alertController: AlertController,
    private authService: AuthService, 
    private router: Router, 
    private api:ConsumoapiService,) { }

  recupera() {
    this.api.recupera(this.logindata.username)
      .then((response: boolean) => {
        // Éxito: redirige a la página de inicio
        this.authService.auth();
        this.router.navigate(['/login']);
        this.Alert1_rec()
      })
      .catch((error: {status: number}) => {
        console.error('Authetication failed', error);
        if (error.status === 401)
        // 401 Unauthorized: Credenciales incorrectas
        this.Alert2_rec()
      }
    );
  }
  
  async Alert1_rec(){

    const alert = await this.alertController.create({
      header:"Contraseña recuperada",
      message:"Contraseña recuperada con exito",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };

  async Alert2_rec(){

    const alert = await this.alertController.create({
      header:"Error de Autenticacion",
      message:"Usuario incorrecto o no existe",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };




}
