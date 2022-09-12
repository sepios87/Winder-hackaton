import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Utilisateur } from 'src/app/models/utilisateur';
import { EmailService } from 'src/app/services/email.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isSendContactForm = false;
  utilisateur?: Utilisateur;

  // Formulaire de contact
  contactForm: FormGroup = this._fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  });

  constructor(
    private _utilisateurService: UtilisateurService,
    private _fb: FormBuilder,
    private _emailService: EmailService,
    private _toast: HotToastService
  ) { }

  ngOnInit(): void {
    if (this._utilisateurService.utilisateurEstConnecte) {
      this.utilisateur = this._utilisateurService.utilisateur;
      this.contactForm.patchValue({
        nom: this.utilisateur.nom,
        prenom: this.utilisateur.prenom,
        email: this.utilisateur.email
      })
    }
  }

  async send(e: Event): Promise<void> {
    this.isSendContactForm = true;
    if (this.contactForm.valid) {
      await this._emailService.sendEmail(e);
      this.contactForm.reset();
      this.isSendContactForm = false;
      this._toast.success('Email bien envoyé !');
    }
  }

}
