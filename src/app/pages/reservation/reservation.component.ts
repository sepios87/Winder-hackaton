import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BateauService } from 'src/app/services/bateau.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Bateau } from 'src/app/models/bateau';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Reservation } from 'src/app/models/reservation';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  isLiked: boolean = false;
  displayModal: boolean = false;
  totalPrice: number = 0;
  estConnecte?: boolean;

  optionsOwl: OwlOptions = {
    center: true,
    items: 1,
    margin: 20
  }

  bateau?: Bateau;
  dateDebut: Date = new Date();
  dateFin: Date = new Date();

  constructor(
    private _route: ActivatedRoute,
    private _reservationService: ReservationService,
    private _bateauService: BateauService,
    private _utilisateurService: UtilisateurService,
    private _router: Router,
    private _toast: HotToastService
  ) { }

  ngOnInit(): void {
    this._getBateau();
    this.estConnectee()
  }

  private _getBateau() {
    const id = this._route.snapshot.paramMap.get('id');
    this._bateauService.afficherBateauAvecId(id!).then(bateau => {
      this.bateau = bateau
      this.refreshLike();
    }
    );
  }

  private _calculPrice() {
    if (this.dateFin.getTime() > this.dateDebut.getTime()) {
      const diff = Math.abs(this.dateFin.getTime() - this.dateDebut.getTime()) / 3600000;
      this.totalPrice = Math.round(diff * this.bateau!.prix);
    } else {
      this.totalPrice = 0;
    }
  }

  onChangeDateDebut(event: any): void {
    this.dateDebut = new Date(event);
    this._calculPrice();
  }

  onChangeDateFin(event: any): void {
    this.dateFin = new Date(event);
    this._calculPrice();
  }

  refreshLike(): void {
    if (this.bateau) {
      this.isLiked = this._utilisateurService.bateauEstFavori(this.bateau?.id);
    }
  }

  toggleDisplayModal() {
    this.displayModal = !this.displayModal;
  }

  estConnectee() {
    this.estConnecte = this._utilisateurService.utilisateurEstConnecte;
  }

  async reserver(): Promise<void> {
    if (this.totalPrice > 0) {
      await this._reservationService.creerReservation(
        new Reservation(
          this.dateDebut,
          this.dateFin,
          this.bateau!.id,
          this._utilisateurService.utilisateur.id,
          this.totalPrice
        )
      );
      this._router.navigate(['/paiement']);
    } else {
      this._toast.error('Il faut saisir des informations valides !');
    }
  }

  async toggleLike(): Promise<void> {
    await this._utilisateurService.changerBateauFavori(this.bateau!.id);
    this.refreshLike();
  }

}
