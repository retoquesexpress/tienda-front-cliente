import { IBookingItem } from "./i-booking-item";
import { IUser } from "./i-user";
export interface IBooking {
    idBooking?: number;
    totalPrice: number;
    items: IBookingItem[];
    user?: IUser;
}
