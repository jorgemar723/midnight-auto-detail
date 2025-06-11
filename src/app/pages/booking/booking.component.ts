import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  name = '';
  email = '';
  phone = '';
  selectedMake = '';
  selectedModel = '';
  year = '';
  color = '';
  notes = '';
  carMakes: string[] = [];
  modelsForSelectedMake: string[] = [];

  carData: Record<string, string[]> = {
    Ford: ['F-150', 'Explorer', 'Mustang'],
    Honda: ['Civic', 'Accord', 'CR-V'],
    Toyota: ['Camry', 'Corolla', 'RAV4'],
    Chevrolet: ['Silverado', 'Malibu', 'Tahoe']
  };

  ngOnInit() {
    this.carMakes = Object.keys(this.carData);
  }

  onMakeChange() {
    this.modelsForSelectedMake = this.carData[this.selectedMake] || [];
    this.selectedModel = ''; // Reset model selection
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.phone.trim() !== '' &&
      this.selectedMake.trim() !== '' &&
      this.selectedModel.trim() !== '' &&
      this.year.trim() !== '' &&
      this.color.trim() !== ''
    );
  }

  submitForm() {
    if (this.isFormValid()) {
      console.log('Booking submitted:', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        make: this.selectedMake,
        model: this.selectedModel,
        year: this.year,
        color: this.color
      });
      alert('Booking submitted!');
    }
  }
}
