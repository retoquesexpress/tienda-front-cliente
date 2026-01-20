import { Component } from '@angular/core';
import { CHeader } from "../../../ui/c-header/c-header";
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CBloque3Imagenes } from "../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CHeader, FotoPrincipalComponent, CBloque3Imagenes, CFooter],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {
  bloques: any[] = [
    {
      img: 'assets/inicio/Peluquería.png',
      texto: 'Peluquería',
    },
    {
      img: 'assets/inicio/Unas.png',
      texto: 'Manicura y pedicura',
    },
    {
      img: 'assets/inicio/Maquillaje.png',
      texto: 'Maquillaje',
    }
  ]

}
