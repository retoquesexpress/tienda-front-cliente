import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CHeader } from "../../../ui/c-header/c-header";
import { CFooter } from "../../../ui/c-footer/c-footer";
import { SCarrito } from '../../../../datos/Services/s-carrito';
import { IServicios } from '../../../../datos/Models/i-servicios';
import { IBookingItem } from '../../../../datos/Models/i-booking-item';
import { PayRequest } from '../../../../datos/Models/pay-request';

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

    cartItems: IBookingItem[] = [];
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
        this.cartItems = this.sCarrito.getCartItems().map(item => {
            return {
                ...item,
                service: {
                    ...item.service,
                    pictureUrl: this.getFullPictureUrl(item.service)
                }
            };
        });

        if (this.cartItems.length > 0) {
            this.fechaReserva = this.cartItems[0].bookingDate;
        }

        this.totalPrice = this.sCarrito.getTotalPrice();

        if (this.cartItems.length === 0) {
            this.router.navigate(['/reservas']);
        }
    }

    private getFullPictureUrl(service: any): string {
        if (!service || !service.pictureUrl) return '';

        const pictureUrl = service.pictureUrl;
        if (pictureUrl.startsWith('assets/') || pictureUrl.startsWith('http') || pictureUrl.startsWith('/assets/')) {
            return pictureUrl;
        }

        let folder = '';
        const catId = service.category?.idCategory;

        if (catId === 1) folder = 'unas';
        else if (catId === 2) folder = 'maquillaje';
        else if (catId === 3) folder = 'peluqueria';

        return folder ? `/assets/${folder}/${pictureUrl}` : `/assets/${pictureUrl}`;
    }

    getServiceTotal(item: IBookingItem): number {
        return item.service.price * item.quantity;
    }

    increaseQuantity(item: IBookingItem): void {
        item.quantity++;
        this.updateTotals();
    }

    decreaseQuantity(item: IBookingItem): void {
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
        this.sCarrito.setCart(this.cartItems);
    }

    confirmarPago(): void {
        this.showErrorMessage = false;

        if (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCvv) {
            this.errorMessage = 'Por favor, rellena todos los datos de la tarjeta.';
            this.showErrorMessage = true;
            return;
        }

        const userDataStr = localStorage.getItem('user_data');
        if (!userDataStr) {
            this.errorMessage = 'No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.';
            this.showErrorMessage = true;
            return;
        }

        const userData = JSON.parse(userDataStr);
        const idUser = userData.idUser;


        let expDate = '2025-12-31';
        if (this.cardExpiry.includes('/')) {
            const [mm, yy] = this.cardExpiry.split('/');
            expDate = `20${yy}-${mm}-01`;
        }

        const payRequest: PayRequest = {
            origen: {
                cardNumber: this.cardNumber,
                expirationDate: expDate,
                cvv: parseInt(this.cardCvv),
                nombreCompleto: this.cardName
            },
            pago: {
                importe: Math.round(this.totalPrice),
                concept: 'Reserva RetoquesExpress'
            }
        };


        this.sCarrito.pay(payRequest).subscribe({
            next: () => {
                console.log('Payment successful');

                this.sCarrito.createBooking(idUser, this.cartItems).subscribe({
                    next: (response) => {
                        console.log('Booking created successfully:', response);
                        this.sCarrito.clearCart();
                        this.showSuccessMessage = true;
                        setTimeout(() => {
                            this.router.navigate(['/reservas']);
                        }, 3000);
                    },
                    error: (error) => {
                        console.error('Error creating booking:', error);
                        this.errorMessage = 'Pago realizado pero error al crear la reserva. Contacte con soporte.';
                        this.showErrorMessage = true;
                    }
                });
            },
            error: (error) => {
                console.error('Payment error:', error);
                this.errorMessage = 'Error al procesar el pago. Por favor, verifique sus datos.';
                this.showErrorMessage = true;
            }
        });
    }
}
