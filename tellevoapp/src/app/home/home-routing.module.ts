import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CarreraComponent } from '../segmentos/carrera/carrera.component';
import { UsuarioComponent } from '../segmentos/usuario/usuario.component';
import { ViajesComponent } from '../segmentos/viajes/viajes.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'carrera',
        component:CarreraComponent,
      },

      {
        path:'usuario',
        component:UsuarioComponent,
      },

      {
        path:'viajes',
        component:ViajesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
