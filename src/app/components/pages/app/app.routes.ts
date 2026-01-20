import { Routes } from '@angular/router';

import { Login } from '../login/login';

import { Unas } from '../tienda/unas/unas';
import { Peluqueria } from '../tienda/peluqueria/peluqueria';
import { Maquillaje } from '../tienda/maquillaje/maquillaje';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'unas', component: Unas },
    { path: 'peluqueria', component: Peluqueria },
    { path: 'maquillaje', component: Maquillaje }
];

