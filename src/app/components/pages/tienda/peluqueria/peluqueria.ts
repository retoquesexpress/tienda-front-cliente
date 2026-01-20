import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from '../../../ui/c-header/c-header';
import { CFooter } from '../../../ui/c-footer/c-footer';
import { FotoPrincipalComponent } from '../../../ui/c-foto-principal/c-foto-principal';
import { CPrecios } from '../../../ui/c-precios/c-precios';


@Component({
  selector: 'app-peluqueria',
  imports: [FotoPrincipalComponent, CPrecios, CBloque3Imagenes, CHeader, CFooter],
  templateUrl: './peluqueria.html',
  styleUrl: './peluqueria.scss'
})
export class Peluqueria {


  precios: any[] = [
    {
      servicio: 'DESPUNTE',
      precio: '350€'
    },
    {
      servicio: 'CORTE + SECADO',
      precio: '450€'
    },
    {
      servicio: 'CORTE EN SECO DE PUNTAS',
      precio: '350€'
    },
    {
      servicio: 'ESTILIZADO CON HERRAMIENTAS',
      precio: '300€'
    },
    {
      servicio: 'CORTE PELO + BARBA',
      precio: '350€'
    },
    {
      servicio: 'PEINADO PARA EVENTO',
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
