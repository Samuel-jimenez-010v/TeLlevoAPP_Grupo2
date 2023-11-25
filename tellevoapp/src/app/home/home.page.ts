import { AfterViewInit, Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Animation,AnimationController} from '@ionic/angular';
import { ConsumoapiService } from '../consumoapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('title',{read: ElementRef}) title:ElementRef;

  username: any;
  animacion_title: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private animationCtrl: AnimationController,
    private api: ConsumoapiService) {

    // Recupera el nombre de usuario del parámetro de la URL.
    this.username = this.route.snapshot.paramMap.get('username');
    
    // Animacion de titulo
    this.title = ElementRef.prototype as any;
    this.animacion_title = ElementRef.prototype as any;
    
  }

  segmentChanged(event : any){
    console.log(event.detail.value);
    let direction=event.detail.value
    this.router.navigate(['home/'+direction])
  }

  ngAfterViewInit() {
    this.titAnimation();
  }

  titAnimation() {

    this.animacion_title = this.animationCtrl
    .create()
    .addElement(this.title.nativeElement)
    .duration(3000)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, transform: 'translateX(0%)'},
      { offset: 0.5, transform: `translateX(50%)` },
      { offset: 1, transform: `translateX(100%)` },
    ])
    .fromTo('opacity', '1', '0.2');

    this.animacion_title.play();
  }
}


