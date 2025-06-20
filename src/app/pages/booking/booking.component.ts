import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartData, VEHICLE_TYPE_LABELS, SERVICE_LABELS, ADD_ON_LABELS } from '../../cart.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  cart: CartData | null = null;
  vehicleLabels = VEHICLE_TYPE_LABELS;
  serviceLabels = SERVICE_LABELS;
  addOnNames = ADD_ON_LABELS;

  name = '';
  email = '';
  phone = '';
  make = '';
  model = '';
  year = '';
  color = '';
  notes = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
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
        cart: this.cart
      });
      alert('Booking submitted!');
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
