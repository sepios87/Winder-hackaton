import { Injectable } from '@angular/core';
import {directus} from "../contants";
import {Itineraire} from "src/app/models/itineraire";

@Injectable({
  providedIn: 'root'
})
export class ItineraireService {

  itineraires: Itineraire[] = [];
  itineraire?: Itineraire;
  constructor() { }

  async afficherItineraires(): Promise<Itineraire[]> {
    if (!this.itineraires.length) {
      try {
        const res = await directus.items('itineraire').readByQuery({
          fields: [
            '*.*',
          ],
        });
        if (res.data) this.itineraires = res.data.map((e: any) => Itineraire.fromDirectusData(e));
      } catch (err) {
        console.log(err);
      }
    }
    return this.itineraires;
  }

  // TODO modifier pr recup dans le liste si existante
  async afficherItineraireParId(id: string | null): Promise<Itineraire | undefined> {
    const res = await directus.items('itineraire').readByQuery({
      filter: {
        id: {
          _eq: id
        },
      },
      fields: [
        '*.*',
      ],
    });
    if (res.data) return Itineraire.fromDirectusData(res.data[0]);
    return;
  }
}
