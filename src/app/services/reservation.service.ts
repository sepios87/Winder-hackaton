import { Injectable } from '@angular/core';
import { Reservation } from "../models/reservation";
import { directus } from "../contants";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [];

  constructor() { }

  async afficherReservationsAvecProfilId(profilId: string): Promise<Reservation[]> {
    if (!this.reservations.length) {
      try {
        const res = await directus.items('reservation').readByQuery({
          filter: {
            profil: {
              _eq: profilId.toString()
            }
          }
        });
        if (res.data) this.reservations = res.data.map((e: any) => Reservation.fromDirectusData(e));
      } catch (err) {
        console.log(err);
      }
    }
    return this.reservations;
  }

  async afficherReservationsAVenirAvecProfilId(profilId: string): Promise<Reservation[]> {
    if (!this.reservations.length) {
      await this.afficherReservationsAvecProfilId(profilId);
    }
    console.log(this.reservations, this.reservations.filter(e => new Date().getDate() <= e.dateDebut.getDate())); 

    return this.reservations.filter(e => new Date().getDate() <= e.dateDebut.getDate());
  }

  async creerReservation(reservation: Reservation): Promise<void> {
    try {
      const res = await directus.items('reservation').createOne(reservation.toDirectusData);
      this.reservations.push(Reservation.fromDirectusData(res));
    } catch (err) {
      console.log(err);
    }

  }

  async supprimerReservation(reservationId: string): Promise<void> {
    try {
      await directus.items('reservation').deleteOne(reservationId);
      this.reservations.splice(this.reservations.findIndex((reservation: Reservation) => reservation.id === reservationId), 1);
    } catch (err) {
      console.log(err);
    }
  }
}
