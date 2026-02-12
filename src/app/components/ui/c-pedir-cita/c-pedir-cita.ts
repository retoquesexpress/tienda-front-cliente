import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-pedir-cita',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './c-pedir-cita.html',
  styleUrl: './c-pedir-cita.scss'
})
export class CPedirCita {
  @Input() img!: string;
}