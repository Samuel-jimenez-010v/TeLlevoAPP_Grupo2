import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConsumoapiService } from '../consumoapi.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  //username: any;
  //password: any;

  logindata: any = {
    username: '',
    password: ''
  
  }

  errorMessage: string = '';


  constructor(
    private authService: AuthService, 
    private router: Router, 
    private api:ConsumoapiService,
    public alertController: AlertController) {}

  //async login() {
    //const OK = await this.api.login(this.logindata.username, this.logindata.password);
    //this.authService.auth();
    //this.router.navigate(['/home'], {state:{userData: this.logindata.username}});
    //return OK
    
  //}

  login() {
    this.api.login(this.logindata.username, this.logindata.password)
      .then((response: boolean) => {
       
        this.authService.auth();
        this.router.navigate(['/home']);
        this.logindata.username = '';
        this.logindata.password = '';
      })
      .catch((error: {status: number}) => {
        console.error('Authetication failed', error);
        if (error.status === 401)
          
          this.Alert1_val()
      }
    );
  }

  async Alert1_val(){

    const alert = await this.alertController.create({
      header:"Error de Autenticacion",
      message:"Usuario o contraseña incorrectos",
      buttons: ["OK"]
    });

    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  };
  
 
}
