import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  async sendEmail(e: Event): Promise<void> {
    await emailjs.sendForm('trixys_form_contact', 'template_jnxypzo', e.target as HTMLFormElement, 'user_UvkPv3Eg33ichNoK21gFb');
  }

}
