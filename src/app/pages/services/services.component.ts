import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type VehicleType = 'car' | 'smallSUV' | 'largeSUV';
type ServiceKey = 'exterior' | 'interior' | 'fullDetail';

interface ServicePricing {
  duration: string;
  car: number;
  smallSUV: number;
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

  selectedAddOns: { [key: string]: boolean } = {
    petHair: false,
    stainExtractor: false
  };

  constructor(private router: Router) {}

  pricing: Record<ServiceKey, ServicePricing> = {
    exterior: {
      duration: '1 hr 30 min – 2 hr',
      car: 80,
      smallSUV: 100,
      largeSUV: 120
    },
    interior: {
      duration: '1 hr – 1 hr 30 min',
      car: 60,
      smallSUV: 75,
      largeSUV: 90
    },
    fullDetail: {
      duration: '2 hr 30 min – 3 hr 30 min',
      car: 120,
      smallSUV: 150,
      largeSUV: 180
    }
  };

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
}
