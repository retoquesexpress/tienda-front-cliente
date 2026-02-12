import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from '../../../ui/c-header/c-header';
import { CFooter } from '../../../ui/c-footer/c-footer';
import { FotoPrincipalComponent } from '../../../ui/c-foto-principal/c-foto-principal';
import { CPrecios } from '../../../ui/c-precios/c-precios';
import { SFuncionalidades } from '../../../../datos/Services/s-funcionalidades';
import { CPedirCita } from '../../../ui/c-pedir-cita/c-pedir-cita';


@Component({
  selector: 'app-peluqueria',
  imports: [FotoPrincipalComponent, CPrecios, CBloque3Imagenes, CHeader, CFooter, RouterLink, CPedirCita],
  templateUrl: './peluqueria.html',
  styleUrl: './peluqueria.scss'
})
export class Peluqueria {

  funcionalidadesService = inject(SFuncionalidades);

  precios: any[] = [];

  bloques: any[] = [];

  ngOnInit(): void {
    this.funcionalidadesService.getServicesByCategory(3).subscribe((data) => {
      this.precios = data;
      this.bloques = data.slice(0, 3).map((item: any) => ({
        img: item.pictureUrl,
        texto: item.name
      }));
    });
  }
}
