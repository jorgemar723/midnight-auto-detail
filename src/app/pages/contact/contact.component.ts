import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  name = '';
  email = '';
  message = '';

  submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  async onSubmit(): Promise<void> {
    if (!this.contactForm?.valid) return;

    this.submitState = 'sending';

    const templateParams = {
      name: this.name,
      email: this.email,
      message: this.message,
      submitted_at: new Date().toLocaleString()
    };

    try {
      await emailjs.send(
        environment.emailjs.serviceID,
        environment.emailjs.contactTemplateID,
        templateParams,
        environment.emailjs.publicKey
      );

      // Show success, reset the form, then return to idle after a short delay
      this.submitState = 'success';
      this.contactForm.resetForm();

      setTimeout(() => {
        this.submitState = 'idle';
      }, 4000);
    } catch (err) {
      console.error(err);
      this.submitState = 'error';

      // Optionally clear the error message after a short delay
      setTimeout(() => {
        this.submitState = 'idle';
      }, 4000);
    }
  }
}
