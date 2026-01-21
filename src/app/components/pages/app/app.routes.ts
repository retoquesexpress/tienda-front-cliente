import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Unas } from '../tienda/unas/unas';
import { Peluqueria } from '../tienda/peluqueria/peluqueria';
import { Inicio } from '../tienda/inicio/inicio';
import { Maquillaje } from '../tienda/maquillaje/maquillaje';
import { Reservas } from '../tienda/reservas/reservas';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'inicio', component: Inicio },
    { path: 'unas', component: Unas },
    { path: 'peluqueria', component: Peluqueria },
    { path: 'maquillaje', component: Maquillaje },
    { path: 'reservas', component: Reservas },
    { path: '**', redirectTo: '' },

];

