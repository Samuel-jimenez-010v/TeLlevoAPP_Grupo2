import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ViajesComponent } from './segmentos/viajes/viajes.component';
import { CarreraComponent } from './segmentos/carrera/carrera.component';
import { UsuarioComponent } from './segmentos/usuario/usuario.component';
import { UsuarioService } from './segmentos/usuario/usuario.service';
import { DetallesModalComponent } from './detalles-modal/detalles-modal.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent,ViajesComponent,CarreraComponent, UsuarioComponent, DetallesModalComponent],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [UsuarioService, DatePipe,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
