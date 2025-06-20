import { Injectable } from '@angular/core';

export type VehicleType = 'car' | 'smallSUV' | 'largeSUV';
export type ServiceKey = 'exterior' | 'interior' | 'fullDetail';
export type AddOnKey = 'petHair' | 'stainExtractor';

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  car: 'Car / Crossover',
  smallSUV: 'Small SUV / Truck',
  largeSUV: 'Large SUV / Truck'
};

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  exterior: 'Exterior Wash',
  interior: 'Interior Detailing',
  fullDetail: 'Full Detail Package'
};

export const ADD_ON_LABELS: Record<AddOnKey, string> = {
  petHair: 'Pet Hair Removal',
  stainExtractor: 'Stain Extractor Treatment'
};

export interface CartData {
  vehicleType: VehicleType;
  service: ServiceKey | null;
  addOns: AddOnKey[];
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
