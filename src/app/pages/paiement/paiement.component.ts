import { Component, OnInit, ViewChild } from '@angular/core';
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import { FormBuilder, Validators } from '@angular/forms';
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement?: StripePaymentElementComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        backgroundColor: '#ECF4FA',
        iconColor: '#006987',
        padding: "500px",
        color: '#006987',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#006987'
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
  
  constructor(private fb: FormBuilder, private stripeService: StripeService) { }

  ngOnInit(): void {
  }

}
