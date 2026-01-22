import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-precios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './c-precios.html',
  styleUrls: ['./c-precios.scss']
})
export class CPrecios {

  @Input() precios: any[] = [
    {

    }
  ]
}
