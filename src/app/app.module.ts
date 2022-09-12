import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ParcoursComponent } from './pages/parcours/parcours.component';
import { ChargementComponent } from './pages/chargement/chargement.component';
import { NgxStripeModule } from "ngx-stripe";
import { CarteComponent } from './shared/carte/carte.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { RetourComponent } from './shared/retour/retour.component';
import { ErrorComponent } from './pages/error/error.component';
import { BateauxComponent } from './pages/bateaux/bateaux.component';
import { BateauVignetteComponent } from './shared/bateau-vignette/bateau-vignette.component';
import { CarouselModule } from "ngx-owl-carousel-o";
import { NavbarComponent } from './core/navbar/navbar.component';
import { RecapComponent } from './pages/recap/recap.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { PaiementComponent } from './pages/paiement/paiement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltreComponent } from './pages/filtre/filtre.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { ReservationItemComponent } from './shared/reservation-item/reservation-item.component';
import { SpecificationsComponent } from './shared/specifications/specifications.component';
import { ItineraireDescriptionComponent } from './shared/itineraire-description/itineraire-description.component';
import { ParcoursDescriptionComponent } from './pages/parcours-description/parcours-description.component';
import { DeconnexionComponent } from './pages/deconnexion/deconnexion.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent,
    ParcoursComponent,
    ChargementComponent,
    CarteComponent,
    ReservationComponent,
    InscriptionComponent,
    RetourComponent,
    ErrorComponent,
    BateauxComponent,
    BateauVignetteComponent,
    ValidationComponent,
    NavbarComponent,
    RecapComponent,
    PaiementComponent,
    FiltreComponent,
    ReservationItemComponent,
    SpecificationsComponent,
    ItineraireDescriptionComponent,
    ParcoursDescriptionComponent,
    DeconnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    CarouselModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51KOMk2ApFYENeqShqVoTHFsWdYcS3oEooKeRg9nMdAUB7oLNX8Nkpzot10YQ23K7D3zWCoQPLxvE9RMox8R29hYh00iMmXhhzp'),
    HotToastModule.forRoot(),
    CarouselModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
