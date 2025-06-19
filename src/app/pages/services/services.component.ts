import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  showExterior = false;
  showInterior = false;
  showFullDetail = false;
  selectedVehicleType: VehicleType = 'car';

  selectedAddOns: { [key: string]: boolean } = {
    petHair: false,
    stainExtractor: false
  };

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
    if (service === 'exterior') {
      this.showExterior = !this.showExterior;
    } else if (service === 'interior') {
      this.showInterior = !this.showInterior;
    } else if (service === 'fullDetail') {
      this.showFullDetail = !this.showFullDetail;
    }
  }

  getPrice(service: ServiceKey): number {
    return this.pricing[service][this.selectedVehicleType];
  }

  getDuration(service: ServiceKey): string {
    return this.pricing[service].duration;
  }

  toggleAddOn(key: string): void {
    this.selectedAddOns[key] = !this.selectedAddOns[key];
  }
}
