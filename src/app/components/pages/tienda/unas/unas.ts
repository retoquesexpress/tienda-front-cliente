import { Component, inject } from '@angular/core';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from "../../../ui/c-header/c-header";
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CPrecios } from "../../../ui/c-precios/c-precios";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { SFuncionalidades } from '../../../../datos/Services/s-funcionalidades';
import { CPedirCita } from '../../../ui/c-pedir-cita/c-pedir-cita';


@Component({
  selector: 'app-unas',
  standalone: true,
  imports: [CBloque3Imagenes, CHeader, FotoPrincipalComponent, CPrecios, CFooter, CPedirCita],
  templateUrl: './unas.html',
  styleUrl: './unas.scss'
})
export class Unas {

  funcionalidadesService = inject(SFuncionalidades);

  precios: any[] = [];

  bloques: any[] = [];

  ngOnInit(): void {
    this.funcionalidadesService.getServicesByCategory(1).subscribe((data) => {
      this.precios = data;
      this.bloques = data.slice(0, 3).map((item: any) => ({
        img: item.pictureUrl,
        texto: item.name
      }));
    });
  }

}
