// Requires: npm install emailjs-com
// Uses EmailJS IDs from src/environments/environment*.ts
// Template placeholders: name, email, phone, carDetails, cartDetails, total, submitted_at
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from '../../../environments/environment';
import { CartService, CartData, VEHICLE_TYPE_LABELS, SERVICE_LABELS, ADD_ON_LABELS } from '../../cart.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('bookingForm') bookingForm!: NgForm;

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

  totalPrice = 0;
  submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cart?.total ?? 0;
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

  private formatCart(cart: CartData | null): string {
    if (!cart) return '';
    const addOn = cart.addOns.includes('petHair') ? ' + Pet Hair Removal' : '';
    const serviceName = cart.service ? this.serviceLabels[cart.service] : 'Service';
    const vehicleType = this.vehicleLabels[cart.vehicleType];
    return `${serviceName} - ${vehicleType}${addOn}`;
  }

  async sendEmail(): Promise<void> {
    if (!this.bookingForm?.valid) return;

    this.submitState = 'sending';
    const v = this.bookingForm.value;

    const templateParams = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      carDetails: `${v.year} ${v.make} ${v.model} (${v.color})`,
      cartDetails: this.formatCart(this.cart),
      total: this.totalPrice,
      submitted_at: new Date().toLocaleString(),
      notes: v.notes || 'N/A'
    };

    try {
      await emailjs.send(
        environment.emailjs.serviceID,
        environment.emailjs.templateID,
        templateParams,
        environment.emailjs.publicKey
      );
      this.submitState = 'success';
      // optional: this.bookingForm.reset();
    } catch (err) {
      console.error(err);
      this.submitState = 'error';
    }
  }
}
