import { Injectable } from '@angular/core';

export type VehicleType = 'car' | 'smallSUV' | 'largeSUV';
export type ServiceKey = 'exterior' | 'interior' | 'fullDetail';

export interface CartData {
  vehicleType: VehicleType;
  service: ServiceKey | null;
  addOns: string[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartData | null = null;

  setCart(data: CartData): void {
    this.cart = data;
  }

  getCart(): CartData | null {
    return this.cart;
  }

  clearCart(): void {
    this.cart = null;
  }
}
