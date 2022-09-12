import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Utilisateur} from "../../models/utilisateur";
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {Validators, FormBuilder} from "@angular/forms";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  utilisateur?: Utilisateur;
  reservations: Reservation[] = []; 

  @ViewChild(StripePaymentElementComponent)
  paymentElement?: StripePaymentElementComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        backgroundColor: 'black',
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  stripeTest = this.fb.group({
    name: ['Angular v12', [Validators.required]],
    amount: [1109, [Validators.required, Validators.pattern(/\d+/)]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paying = false;

  constructor(
    private _utilisateurService : UtilisateurService,
    private fb: FormBuilder,
    private stripeService: StripeService, 
    private _reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.getUtilisateur(); 
    this.getReservationAVenir(); 
  }

  private getUtilisateur() {
    this.utilisateur = this._utilisateurService.utilisateur;
  }

  private async getReservationAVenir(){
    this.reservations = await this._reservationService.afficherReservationsAVenirAvecProfilId(this.utilisateur!.id); 
  }

}
