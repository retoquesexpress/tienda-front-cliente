import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CHeader } from "../../../ui/c-header/c-header";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { SFuncionalidades } from '../../../../datos/Services/s-funcionalidades';
import { LoginService } from '../../../../datos/Services/s-login';
import { IServicios } from '../../../../datos/Models/i-servicios';
import { ICategorias } from '../../../../datos/Models/i-categorias';
import { SCarrito } from '../../../../datos/Services/s-carrito';
import { IBookingItem } from '../../../../datos/Models/i-booking-item';

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
  private sCarrito = inject(SCarrito);

  categories: ICategorias[] = [];
  selectedCategory: ICategorias | null = null;

  currentServices: IServicios[] = [];

  selectedServicesMap: Map<number, number> = new Map();

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
      this.loadCategories();
    }
  }

  private getFullPictureUrl(service: any): string {
    if (!service || !service.pictureUrl) return '';

    const pictureUrl = service.pictureUrl;
    if (pictureUrl.startsWith('assets/') || pictureUrl.startsWith('http') || pictureUrl.startsWith('/assets/')) {
      return pictureUrl;
    }

    let folder = '';
    const catId = service.category?.idCategory || (typeof service.idCategory === 'number' ? service.idCategory : null);

    if (catId === 1) folder = 'unas';
    else if (catId === 2) folder = 'maquillaje';
    else if (catId === 3) folder = 'peluqueria';

    return folder ? `/assets/${folder}/${pictureUrl}` : `/assets/${pictureUrl}`;
  }

  loadCategories(): void {
    this.sFuncionalidades.getAllCategories().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.categories = data;
          this.selectCategory(this.categories[0]);
        }
      },
      error: (err) => {
        console.error('Error al cargar categorias', err);
      }
    });
  }

  selectCategory(category: ICategorias): void {
    this.selectedCategory = category;
    this.sFuncionalidades.getServicesByCategory(category.idCategory).subscribe({
      next: (data) => {
        this.currentServices = data.map(service => ({
          ...service,
          pictureUrl: this.getFullPictureUrl(service)
        }));
      },
      error: (err) => {
        console.error('Error al cargar servicios de la categoria', err);
        this.currentServices = [];
      }
    });
  }


  cargarReservas(): void {
    const userDataStr = localStorage.getItem('user_data');
    if (!userDataStr) return;

    const userData = JSON.parse(userDataStr);
    const idUser = userData.idUser;

    this.sCarrito.getBookingsByUser(idUser).subscribe({
      next: (bookings) => {
        this.misReservas = bookings.map(b => ({
          id: b.idBooking,
          total: b.totalPrice,
          fecha: b.items && b.items.length > 0 ? b.items[0].bookingDate : null,
          servicios: b.items.map((item: any) => ({
            name: item.serviceName,
            quantity: item.quantity,
            pictureUrl: this.getFullPictureUrl({
              pictureUrl: item.pictureUrl,
              category: { idCategory: item.idCategory }
            })
          }))
        }));
      },
      error: (err) => {
        console.error('Error al cargar historial de reservas', err);
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }


  getQuantity(serviceId: number): number {
    return this.selectedServicesMap.get(serviceId) || 0;
  }

  decreaseService(service: IServicios, event?: Event): void {
    if (event) event.stopPropagation();
    const currentQty = this.getQuantity(service.idService);
    if (currentQty > 1) {
      this.selectedServicesMap.set(service.idService, currentQty - 1);
    } else {
      this.removeService(service.idService, event);
    }
  }

  removeService(serviceId: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.selectedServicesMap.delete(serviceId);
  }

  private serviceObjects: Map<number, IServicios> = new Map();

  addService(service: IServicios, event?: Event): void {
    if (event) event.stopPropagation();

    if (!this.serviceObjects.has(service.idService)) {
      this.serviceObjects.set(service.idService, service);
    }

    const currentQty = this.getQuantity(service.idService);
    this.selectedServicesMap.set(service.idService, currentQty + 1);
  }

  get precioTotal(): number {
    let total = 0;
    this.selectedServicesMap.forEach((qty, id) => {
      const service = this.serviceObjects.get(id);
      if (service) {
        total += service.price * qty;
      }
    });
    return total;
  }

  getTotalServicesCount(): number {
    let count = 0;
    this.selectedServicesMap.forEach(qty => count += qty);
    return count;
  }

  goToCart(): void {
    this.errorMessage = '';

    if (this.selectedServicesMap.size === 0) {
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

    const cartItems: IBookingItem[] = [];
    this.selectedServicesMap.forEach((qty, id) => {
      const service = this.serviceObjects.get(id);
      if (service) {
        cartItems.push({
          service: service,
          quantity: qty,
          bookingDate: this.fechaReserva
        });
      }
    });

    this.sCarrito.setCart(cartItems);
    this.router.navigate(['/carrito']);
  }
}
