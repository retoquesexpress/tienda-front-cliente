import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CPrecios } from '../../../ui/c-precios/c-precios';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from '../../../ui/c-header/c-header';
import { CFooter } from '../../../ui/c-footer/c-footer';
import { SFuncionalidades } from '../../../../datos/Services/s-funcionalidades';


@Component({
    selector: 'app-maquillaje',
    imports: [FotoPrincipalComponent, CPrecios, CBloque3Imagenes, CHeader, CFooter],
    templateUrl: './maquillaje.html',
    styleUrl: './maquillaje.scss'
})
export class Maquillaje {

    funcionalidadesService = inject(SFuncionalidades);

    precios: any[] = [];

    bloques: any[] = [];

    ngOnInit(): void {
        this.funcionalidadesService.getServicesByCategory(2).subscribe((data) => {
            this.precios = data;
            this.bloques = data.slice(0, 3).map((item: any) => ({
                img: item.pictureUrl,
                texto: item.name
            }));
        });
    }


}
