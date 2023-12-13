import { Component, OnInit, ElementRef, ViewChildren, ViewChild, HostListener } from '@angular/core';
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
  logindata: any = {
    username: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private api: ConsumoapiService,
    public alertController: AlertController
  ) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const indicator = document.querySelector('.mouse-hover-indicator') as HTMLElement;

    // Obtén las coordenadas del puntero del mouse
    const x = event.clientX;
    const y = event.clientY;

    // Actualiza la posición del indicador alrededor del puntero del mouse
    indicator.style.left = `${x - indicator.offsetWidth / 2}px`;
    indicator.style.top = `${y - indicator.offsetHeight / 2}px`;
  }

  login() {
    this.api.login(this.logindata.username, this.logindata.password)
      .then((response: boolean) => {
        this.authService.auth();
        this.router.navigate(['/home']);
        this.logindata.username = '';
        this.logindata.password = '';
      })
      .catch((error: { status: number }) => {
        console.error('Authentication failed', error);
        if (error.status === 401) {
          this.Alert1_val();
        }
      });
  }

  async Alert1_val() {
    const alert = await this.alertController.create({
      header: 'Error de Autenticacion',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
