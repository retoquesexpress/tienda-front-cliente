import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookingItem } from '../Models/i-booking-item';

import { PayRequest } from '../Models/pay-request';

@Injectable({
  providedIn: 'root'
})
export class SCarrito {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/bookings';
  private apiPayUrl = 'http://localhost:8080/api/payments';

  private _cartItems: IBookingItem[] = [];
  private readonly CART_KEY = 'shopping_cart';

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem(this.CART_KEY);
    if (savedCart) {
      try {
        this._cartItems = JSON.parse(savedCart);
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
        this._cartItems = [];
      }
    }
  }

  setCart(items: IBookingItem[]) {
    this._cartItems = items;
    localStorage.setItem(this.CART_KEY, JSON.stringify(this._cartItems));
  }

  getCartItems(): IBookingItem[] {
    return this._cartItems;
  }

  clearCart() {
    this._cartItems = [];
    localStorage.removeItem(this.CART_KEY);
  }

  getTotalPrice(): number {
    return this._cartItems.reduce((acc, item) => acc + (item.service.price * item.quantity), 0);
  }

  pay(payRequest: PayRequest): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiPayUrl}/card`, payRequest, { headers });
  }

  createBooking(idUser: number, items: IBookingItem[]): Observable<any> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const bookingRequest = {
      idUser: idUser,
      items: items.map(item => ({
        idService: item.service.idService,
        quantity: item.quantity,
        bookingDate: item.bookingDate
      }))
    };

    return this.http.post(this.apiUrl, bookingRequest, { headers });
  }

  getBookingsByUser(idUser: number): Observable<any[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/booking/${idUser}`, { headers });
  }
}
