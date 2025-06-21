import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartData, VehicleType as CartVehicleType, SERVICE_LABELS, VEHICLE_TYPE_LABELS, AddOnKey, ADD_ON_LABELS } from '../../cart.service';

type VehicleType = 'car' | 'smallSUV' | 'midsizeSUV' | 'largeSUV'; // internal only
type ServiceKey = 'exterior' | 'interior' | 'fullDetail';

interface ServicePricing {
  duration: string;
  car: number;
  smallSUV: number;
  midsizeSUV: number;
  largeSUV: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class ServicesComponent {
  selectedVehicleType: VehicleType = 'car';
  selectedService: ServiceKey | null = null;

  selectedAddOns: Record<AddOnKey, boolean> = {
    petHair: false,
    stainExtractor: false
  };

  vehicleTypeLabels: { [key in VehicleType]: CartVehicleType } = {
    car: 'car',
    smallSUV: 'smallSUV',
    midsizeSUV: 'midsizeSUV',
    largeSUV: 'largeSUV'
  };

  displayVehicleNames = VEHICLE_TYPE_LABELS;
  serviceNames = SERVICE_LABELS;
  addOnNames = ADD_ON_LABELS;

  pricing: Record<ServiceKey, ServicePricing> = {
    exterior: {
      duration: '1 hr – 2 hr',
      car: 80,
      smallSUV: 100,
      midsizeSUV: 120,
      largeSUV: 140
    },
    interior: {
      duration: '3 hr – 4 hr',
      car: 180,
      smallSUV: 200,
      midsizeSUV: 220,
      largeSUV: 240
    },
    fullDetail: {
      duration: '5 hr – 6 hr',
      car: 240,
      smallSUV: 270,
      midsizeSUV: 300,
      largeSUV: 330
    }
  };

  constructor(private router: Router, private cartService: CartService) {}

  toggleService(service: ServiceKey): void {
    this.selectedService = this.selectedService === service ? null : service;
  }

  getPrice(service: ServiceKey): number {
    return this.pricing[service][this.selectedVehicleType];
  }

  getDuration(service: ServiceKey): string {
    return this.pricing[service].duration;
  }

  getAddOnTotal(): number {
    let total = 0;
    if (this.selectedAddOns['petHair']) total += 20;
    if (this.selectedAddOns['stainExtractor']) total += 25;
    return total;
  }

  getServiceTotal(): number {
    return this.selectedService ? this.getPrice(this.selectedService) : 0;
  }

  getCartTotal(): number {
    return this.getServiceTotal() + this.getAddOnTotal();
  }

  continueToBooking(): void {
    const addOns = (Object.keys(this.selectedAddOns) as AddOnKey[])
      .filter(key => this.selectedAddOns[key]);
    const cart: CartData = {
      vehicleType: this.vehicleTypeLabels[this.selectedVehicleType],
      service: this.selectedService,
      addOns,
      total: this.getCartTotal()
    };
    this.cartService.setCart(cart);
    this.router.navigate(['/booking']);
  }
}
