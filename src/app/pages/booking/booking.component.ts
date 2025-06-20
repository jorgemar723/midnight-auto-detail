import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartData } from '../../cart.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  cart: CartData | null = null;
  name = '';
  email = '';
  phone = '';
  make = '';
  model = '';
  year = '';
  color = '';
  notes = '';

  // Cart details from query params
  service: string | null = null;
  vehicleType: string | null = null;
  total: number = 0;
  petHair = false;
  stainExtractor = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.service = params['service'];
      this.vehicleType = params['vehicleType'];
      this.total = +params['total'] || 0;
      this.petHair = params['petHair'] === 'true';
      this.stainExtractor = params['stainExtractor'] === 'true';
    });
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.phone.trim() !== '' &&
      this.make.trim() !== '' &&
      this.model.trim() !== '' &&
      this.year.trim() !== '' &&
      this.color.trim() !== ''
    );
  }

  submitForm(): void {
    if (this.isFormValid()) {
      console.log('Booking submitted:', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        make: this.make,
        model: this.model,
        year: this.year,
        color: this.color,
        notes: this.notes,
        service: this.service,
        vehicleType: this.vehicleType,
        addOns: {
          petHair: this.petHair,
          stainExtractor: this.stainExtractor
        },
        total: this.total
      });
      alert('Booking submitted!');
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
