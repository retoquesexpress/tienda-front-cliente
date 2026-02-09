import { IServicios } from "./i-servicios";

export interface IBookingItem {
  idBookingItem?: number;
  quantity: number;
  bookingDate: string;
  service: IServicios;
  totalPrice?: number;
}
