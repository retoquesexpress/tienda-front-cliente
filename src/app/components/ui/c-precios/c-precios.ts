import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-precios',
  templateUrl: './c-precios.html',
  styleUrls: ['./c-precios.scss']
})
export class CPrecios {

  @Input() precios: any[] = [
    {

    }
  ]
}
