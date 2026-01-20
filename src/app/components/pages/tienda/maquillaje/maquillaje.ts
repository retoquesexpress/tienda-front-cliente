import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FotoPrincipalComponent } from "../../../ui/c-foto-principal/c-foto-principal";
import { CPrecios } from '../../../ui/c-precios/c-precios';
import { CBloque3Imagenes } from '../../../ui/c-bloque-3-imagenes/c-bloque-3-imagenes';
import { CHeader } from '../../../ui/c-header/c-header';
import { CFooter } from '../../../ui/c-footer/c-footer';


@Component({
    selector: 'app-maquillaje',
    imports: [FotoPrincipalComponent, CPrecios, CBloque3Imagenes, CHeader, CFooter],
    templateUrl: './maquillaje.html',
    styleUrl: './maquillaje.scss'
})
export class Maquillaje {


    precios: any[] = [
        {
            servicio: 'MAQUILLAJE SENCILLO',
            precio: '350€'
        },
        {
            servicio: 'MAQUILLAJE EVENTOS',
            precio: '450€'
        },
        {
            servicio: 'MAQUILLAJE ARTISTICO',
            precio: '350€'
        },
        {
            servicio: 'DESCUBRE TU COLORIMETRÍA',
            precio: '150€'
        },
        {
            servicio: 'MAQUILLAJE + SKINCARE',
            precio: '350€'
        },
        {
            servicio: 'MAQUILLAJE DE NOVIA',
            precio: '600€'
        }
    ]

    bloques: any[] = [
        {
            img: 'assets/maquillaje/MaquillajeSencilloPanel1.png',
            texto: 'Maquillaje sencillo'
        },
        {
            img: 'assets/maquillaje/MaquillajeEventosPanel2.png',
            texto: 'Maquillaje eventos'
        },
        {
            img: 'assets/maquillaje/MaquillajeArtisticoPanel3.png',
            texto: 'Maquillaje artístico'
        }
    ]
}
