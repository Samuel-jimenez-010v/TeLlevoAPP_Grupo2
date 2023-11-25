// app-routing.module.ts
import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { 
    path: 'login',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
},

{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},


  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },

  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}





