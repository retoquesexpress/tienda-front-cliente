import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CHeader } from "../../../ui/c-header/c-header";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { SFuncionalidades } from '../../../../datos/Services/s-funcionalidades';
import { LoginService } from '../../../../datos/Services/s-login';
import { IServicios } from '../../../../datos/Models/i-servicios';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, CHeader, CFooter],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss'
})
export class Reservas implements OnInit {
  private sFuncionalidades = inject(SFuncionalidades);
  private loginService = inject(LoginService);
  private router = inject(Router);

  serviciosDisponibles: IServicios[] = [];
  serviciosSeleccionados: IServicios[] = [];
  servicioSeleccionadoId: number | string = '';
  fechaReserva: string = '';
  misReservas: any[] = [];
  minDate: string = '';
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  isLoggedIn: boolean = false;

  constructor() {
    this.setMinDate();
  }

  setMinDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isRegistered();
    if (this.isLoggedIn) {
      this.cargarReservas();
      this.sFuncionalidades.getAllServices().subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.serviciosDisponibles = data;
          }
        },
        error: (err) => {
          console.error('Error al cargar servicios, usando datos de ejemplo', err);
        }
      });
    }
  }

  cargarReservas(): void {
    const reservasGuardadas = localStorage.getItem('my_reservations');
    if (reservasGuardadas) {
      const reservas = JSON.parse(reservasGuardadas);
      const ahora = new Date();

      this.misReservas = reservas.filter((r: any) => new Date(r.fecha) > ahora);

      if (this.misReservas.length !== reservas.length) {
        localStorage.setItem('my_reservations', JSON.stringify(this.misReservas));
      }
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  agregarServicio(): void {
    if (this.servicioSeleccionadoId === '') return;

    const servicio = this.serviciosDisponibles.find(s => s.idService === Number(this.servicioSeleccionadoId));
    if (servicio && !this.serviciosSeleccionados.some(s => s.idService === servicio.idService)) {
      this.serviciosSeleccionados.push(servicio);
    }
  }

  eliminarServicio(id: number): void {
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(s => s.idService !== id);
  }

  get precioTotal(): number {
    return this.serviciosSeleccionados.reduce((acc, curr) => acc + curr.price, 0);
  }

  reservar(): void {
    this.errorMessage = '';

    if (this.serviciosSeleccionados.length === 0) {
      this.errorMessage = 'Por favor, selecciona al menos un servicio.';
      return;
    }
    if (!this.fechaReserva) {
      this.errorMessage = 'Por favor, selecciona una fecha.';
      return;
    }

    const fechaSeleccionada = new Date(this.fechaReserva);
    const ahora = new Date();

    if (fechaSeleccionada <= ahora) {
      this.errorMessage = 'No se puede reservar en una fecha u hora pasada.';
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      servicios: [...this.serviciosSeleccionados],
      fecha: this.fechaReserva,
      total: this.precioTotal,
      fechaCreacion: new Date().toISOString()
    };

    this.misReservas.push(nuevaReserva);
    this.guardarReservas();


    this.serviciosSeleccionados = [];
    this.servicioSeleccionadoId = '';
    this.fechaReserva = '';


    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  guardarReservas(): void {
    this.misReservas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    localStorage.setItem('my_reservations', JSON.stringify(this.misReservas));
  }
}
