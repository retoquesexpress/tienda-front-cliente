import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CHeader } from "../../../ui/c-header/c-header";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { SCarrito } from '../../../../datos/Services/s-carrito';
import { IServicios } from '../../../../datos/Models/i-servicios';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, FormsModule, CHeader, CFooter],
    templateUrl: './carrito.html',
    styleUrl: './carrito.scss'
})
export class Carrito implements OnInit {
    private sCarrito = inject(SCarrito);
    private router = inject(Router);

    cartItems: { service: IServicios, quantity: number }[] = [];
    fechaReserva: string = '';
    totalPrice: number = 0;


    cardName: string = '';
    cardNumber: string = '';
    cardExpiry: string = '';
    cardCvv: string = '';

    showSuccessMessage: boolean = false;
    showErrorMessage: boolean = false;
    errorMessage: string = '';

    ngOnInit(): void {
        this.cartItems = this.sCarrito.getCartItems();
        this.fechaReserva = this.sCarrito.getReservationDate();
        this.totalPrice = this.sCarrito.getTotalPrice();

        if (this.cartItems.length === 0) {
            this.router.navigate(['/reservas']);
        }
    }

    getServiceTotal(item: { service: IServicios, quantity: number }): number {
        return item.service.price * item.quantity;
    }

    increaseQuantity(item: { service: IServicios, quantity: number }): void {
        item.quantity++;
        this.updateTotals();
    }

    decreaseQuantity(item: { service: IServicios, quantity: number }): void {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            const index = this.cartItems.indexOf(item);
            if (index > -1) {
                this.cartItems.splice(index, 1);
            }
            if (this.cartItems.length === 0) {
                this.router.navigate(['/reservas']);
            }
        }
        this.updateTotals();
    }

    updateTotals(): void {
        this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.service.price * item.quantity), 0);
        this.sCarrito.setCart(this.cartItems, this.fechaReserva);
    }

    confirmarPago(): void {
        this.showErrorMessage = false;

        if (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCvv) {
            this.errorMessage = 'Por favor, rellena todos los datos de la tarjeta.';
            this.showErrorMessage = true;
            return;
        }


        const allServices: IServicios[] = [];
        this.cartItems.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                allServices.push(item.service);
            }
        });

        const nuevaReserva = {
            id: Date.now(),
            servicios: allServices,
            fecha: this.fechaReserva,
            total: this.totalPrice,
            fechaCreacion: new Date().toISOString()
        };

        const reservasGuardadas = localStorage.getItem('my_reservations');
        let misReservas: any[] = [];
        if (reservasGuardadas) {
            misReservas = JSON.parse(reservasGuardadas);
        }

        misReservas.push(nuevaReserva);
        misReservas.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        localStorage.setItem('my_reservations', JSON.stringify(misReservas));

        this.sCarrito.clearCart();
        this.showSuccessMessage = true;

        setTimeout(() => {
            this.router.navigate(['/reservas']);
        }, 3000);
    }
}
