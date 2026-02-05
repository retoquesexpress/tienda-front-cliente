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

  // Services filtered by category (current view)
  currentServices: IServicios[] = [];

  // Map to store serviceId -> quantity
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
        this.currentServices = this.assignLocalImages(data, category.name);
      },
      error: (err) => {
        console.error('Error al cargar servicios de la categoria', err);
        this.currentServices = [];
      }
    });
  }

  private assignLocalImages(services: IServicios[], categoryName: string): IServicios[] {
    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const catName = normalize(categoryName);

    let images: string[] = [];

    if (catName.includes('maquillaje')) {
      images = [
        '/assets/maquillaje/MaquillajeArtisticoPanel3.png',
        '/assets/maquillaje/MaquillajeEventosPanel2.png',
        '/assets/maquillaje/MaquillajeSencilloPanel1.png',
        '/assets/maquillaje/FotoGrandeMaquillaje.png'
      ];
    } else if (catName.includes('peluqueria')) {
      images = [
        '/assets/peluqueria/CortePanel.png',
        '/assets/peluqueria/PeinadoPanel.png',
        '/assets/peluqueria/BarbaPanel.png',
        '/assets/peluqueria/FotoGrandePeluqueria.png'
      ];
    } else if (catName.includes('una') || catName.includes('manicura')) {
      images = [
        '/assets/unas/ManicuraFrancesaBloque1.jpg',
        '/assets/unas/SemipermanenteBloque2.png',
        '/assets/unas/UnasOrnamentadasBloque3.jpg',
        '/assets/unas/UñasAzules.jpg',
        '/assets/unas/UñasPuntitos.jpg'
      ];
    }

    if (images.length === 0) return services;

    return services.map((service, index) => {
      return {
        ...service,
        pictureUrl: images[index % images.length]
      };
    });
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

  // --- Quantity Logic ---

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

    const cartItems: { service: IServicios, quantity: number }[] = [];
    this.selectedServicesMap.forEach((qty, id) => {
      const service = this.serviceObjects.get(id);
      if (service) {
        cartItems.push({ service: service, quantity: qty });
      }
    });

    this.sCarrito.setCart(cartItems, this.fechaReserva);
    this.router.navigate(['/carrito']);
  }

  guardarReservas(): void {
    this.misReservas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    localStorage.setItem('my_reservations', JSON.stringify(this.misReservas));
  }
  getGroupedServices(services: IServicios[]): { name: string, quantity: number, total: number }[] {
    const grouped = new Map<number, { name: string, quantity: number, price: number }>();

    services.forEach(service => {
      if (grouped.has(service.idService)) {
        const item = grouped.get(service.idService)!;
        item.quantity += 1;
      } else {
        grouped.set(service.idService, { name: service.name, quantity: 1, price: service.price });
      }
    });

    return Array.from(grouped.values()).map(item => ({
      name: item.name,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));
  }
}
