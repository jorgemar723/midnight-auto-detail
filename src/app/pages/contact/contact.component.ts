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
      this.submitState = 'success';
      // optionally reset the form:
      // this.contactForm.resetForm();
    } catch (err) {
      console.error(err);
      this.submitState = 'error';
    }
  }
}

