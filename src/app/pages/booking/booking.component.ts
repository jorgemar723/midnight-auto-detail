import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
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
  carMakes: string[] = [];
  modelsForSelectedMake: string[] = [];

  carData: { [make: string]: string[] } = {
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
      !!this.name &&
      !!this.email &&
      !!this.phone &&
      !!this.selectedMake &&
      !!this.selectedModel &&
      !!this.year &&
      !!this.color
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
