import { Injectable } from '@angular/core';
import { IServicios } from '../Models/i-servicios';

@Injectable({
  providedIn: 'root'
})
export class SCarrito {
  private _cartItems: { service: IServicios, quantity: number }[] = [];
  private _reservationDate: string = '';

  constructor() { }

  setCart(items: { service: IServicios, quantity: number }[], date: string) {
    this._cartItems = items;
    this._reservationDate = date;
  }

  getCartItems() {
    return this._cartItems;
  }

  getReservationDate() {
    return this._reservationDate;
  }

  clearCart() {
    this._cartItems = [];
    this._reservationDate = '';
  }

  getTotalPrice(): number {
    return this._cartItems.reduce((acc, item) => acc + (item.service.price * item.quantity), 0);
  }
}
