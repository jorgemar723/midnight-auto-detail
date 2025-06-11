import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  onSubmit() {
    console.log('Form submitted:', {
      name: this.name,
      email: this.email,
      message: this.message
    });
    alert('Thank you for reaching out! We will get back to you shortly.');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
