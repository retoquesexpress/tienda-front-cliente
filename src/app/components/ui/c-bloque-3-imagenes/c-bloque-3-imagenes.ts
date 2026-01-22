import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-bloque-3-imagenes',
  imports: [RouterLink],
  templateUrl: './c-bloque-3-imagenes.html',
  styleUrl: './c-bloque-3-imagenes.scss'
})
export class CBloque3Imagenes {
  @Input() bloques: any[] = [
    {

    }
  ]

  @Input() ruta: string = ''
}
