// usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  nombreUsuario: string = '';
  private usuarioActual: any;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private router:Router
  ) {}

  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(
      (usuario) => {
        this.authService.setUsuarioActual(usuario);
        this.userDataService.guardarUsuarioActual(usuario); // Guarda el usuario usando el servicio
        this.nombreUsuario = this.authService.getNombreUsuario();
      },
      (error) => {
        console.error('Error al obtener el usuario actual', error);
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
