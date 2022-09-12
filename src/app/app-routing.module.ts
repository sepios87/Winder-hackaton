import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from './auth.guard';
import { ParcoursComponent } from './pages/parcours/parcours.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ChargementComponent } from "./pages/chargement/chargement.component";
import { InscriptionComponent } from "./pages/inscription/inscription.component";
import { ErrorComponent } from "./pages/error/error.component";
import { BateauxComponent } from './pages/bateaux/bateaux.component';
import { RecapComponent } from './pages/recap/recap.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { SpecificationsComponent } from './shared/specifications/specifications.component';
import {FiltreComponent} from "./pages/filtre/filtre.component";
import { ValidationComponent } from './pages/validation/validation.component';
import {ParcoursDescriptionComponent} from "./pages/parcours-description/parcours-description.component";
import {DeconnexionComponent} from "./pages/deconnexion/deconnexion.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'bateaux',
    component: BateauxComponent
  },
  {
    path: 'paiement',
    component: PaiementComponent,
    canActivate: [AuthGuard],
  },{
    path: 'specifications',
    component: SpecificationsComponent
  },
  {
    path: 'validation',
    component: ValidationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'parcours',
    children: [{
      path: ':id',
      component: ParcoursComponent
    }, {
      path: 'details/:id',
      component: ParcoursDescriptionComponent
    }]
  },
  {
    path: 'recap',
    component: RecapComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'deconnexion',
    component: DeconnexionComponent
  },
  {
    path: 'chargement',
    component: ChargementComponent
  },
  {
    path: 'reservation/:id',
    component: ReservationComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'filtre',
    component: FiltreComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
