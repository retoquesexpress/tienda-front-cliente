import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CPrecios } from '../../../ui/c-precios/c-precios';


@Component({
  selector: 'app-peluqueria',
  imports: [RouterLink, FotoPrincipalComponent, CPrecios],
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
}
