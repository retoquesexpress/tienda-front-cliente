import { Component } from '@angular/core';
import { CHeader } from "../../../ui/c-header/c-header";
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CBloque3Imagenes } from "../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { RouterLink } from '@angular/router';
import { CPedirCita } from '../../../ui/c-pedir-cita/c-pedir-cita';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CHeader, FotoPrincipalComponent, CBloque3Imagenes, CFooter, RouterLink, CPedirCita],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {
  bloques: any[] = [
    {
      img: 'assets/inicio/Peluquería.png',
      texto: 'Peluquería',
      ruta: '/peluqueria'
    },
    {
      img: 'assets/inicio/Unas.png',
      texto: 'Manicura y pedicura',
      ruta: '/unas'
    },
    {
      img: 'assets/inicio/Maquillaje.png',
      texto: 'Maquillaje',
      ruta: '/maquillaje'
    }
  ]

}
