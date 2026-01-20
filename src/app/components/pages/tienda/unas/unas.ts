import { Component } from '@angular/core';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from "../../../ui/c-header/c-header";
import { FotoPrincipalComponent } from '../../../ui/c-foto-principal/c-foto-principal';
import { CPrecios } from '../../../ui/c-precios/c-precios';

@Component({
  selector: 'app-unas',
  standalone: true,
  imports: [CBloque3Imagenes, CHeader, FotoPrincipalComponent, CPrecios],
  templateUrl: './unas.html',
  styleUrl: './unas.scss'
})
export class Unas {

  precios: any[] = [
    {
      servicio: 'UÑAS ESPECIAL',
      precio: '350€'
    },
    {
      servicio: 'UÑAS GEL',
      precio: '450€'
    },
    {
      servicio: 'UÑAS ACRÍLICO',
      precio: '350€'
    },
    {
      servicio: 'MANICURA BÁSICA',
      precio: '300€'
    },
    {
      servicio: 'MANICURA SPA',
      precio: '350€'
    },
    {
      servicio: 'ESMALTADO SEMIPERMANENTE',
      precio: '600€'
    }
  ]


  bloques: any[] = [
    {
      img: 'assets/peluqueria/CortePanel.png',
      texto: 'Corte y tinte'
    },
    {
      img: 'assets/peluqueria/PeinadoPanel.png',
      texto: 'Peinado evento'
    },
    {
      img: 'assets/peluqueria/BarbaPanel.png',
      texto: 'Barbería'
    }
  ]


}
