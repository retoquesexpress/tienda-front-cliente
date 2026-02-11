export interface OrigenDto {
    cardNumber: string;
    expirationDate: string; // ISO format: YYYY-MM-DD
    cvv: number;
    nombreCompleto: string;
}

export interface PagoDto {
    importe: number;
    concept: string;
}

export interface PayRequest {
    origen: OrigenDto;
    pago: PagoDto;
}
