import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foto-principal',
  templateUrl: './c-foto-ptincipal.html',
  styleUrls: ['./c-foto-ptincipal.scss']
})
export class FotoPrincipalComponent {

   @Input() img!: string
}

