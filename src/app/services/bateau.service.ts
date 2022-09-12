import { Injectable } from '@angular/core';
import { Bateau } from "../models/bateau";
import { directus } from "../contants";

@Injectable({
  providedIn: 'root'
})
export class BateauService {

  bateaux: Bateau[] = [];

  constructor() { }

  /**
   * Retourne tous les bateaux
   * @returns <Bateau[]> bateaux
   */
  async afficherBateaux(): Promise<Bateau[]> {
    if (!this.bateaux.length) {
      try {
        const res = await directus.items('bateau').readByQuery({
          fields: [
            '*',
            'images.*',
          ],
        });
        if (res.data) this.bateaux = res.data.map((e: any) => Bateau.fromDirectusData(e));
      } catch (err) {
        console.log(err);
      }
    }
    return this.bateaux;
  }

  /**
   * Retourne un bateau à partir de son ID
   * @returns <Bateau | undefined> bateau
   * @param id
   */
  async afficherBateauAvecId(id: string): Promise<Bateau | undefined> {
    if (!this.bateaux.length) {
      try {
        const res = await directus.items('bateau').readOne(id, {
          fields: [
            '*',
            'images.*',
          ],
        });
        if (res) return Bateau.fromDirectusData(res);
      } catch (err) {
        console.log(err);
      }
    }
    return this.bateaux.find(e => e.id == id);
  }
}
