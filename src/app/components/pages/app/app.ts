import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CHeader } from '../../ui/c-header/c-header';
import { LoginService } from '../../../datos/Services/s-login';
import { Categorias } from "../admin/gestion-categorias/categorias/categorias";
import { CBloque3Imagenes } from "../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CHeader, Categorias, CBloque3Imagenes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tienda-front');

  loginService = inject(LoginService)
  logged=false;

  ngOnInit() {
    this.loginService.isLogged$.subscribe(isLogged => {
      this.logged = isLogged;
    });
  }
}
