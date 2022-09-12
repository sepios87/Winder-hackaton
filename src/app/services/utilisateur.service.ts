import { Injectable } from '@angular/core';
import { directus } from '../contants';
import { Utilisateur } from '../models/utilisateur';
import { sha256 } from 'js-sha256';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private _utilisateur?: Utilisateur;
  private _$estConnecteSubject = new BehaviorSubject<boolean>(false)

  get utilisateur(): Utilisateur {
    if (!this.utilisateurEstConnecte) throw 'Utilisateur non connecté';
    return this._utilisateur!;
  }

  get utilisateurEstConnecte(): boolean {
    return this._$estConnecteSubject.value;
  }

  get utilisateurEstConnecteObservable(): Observable<boolean> {
    return this._$estConnecteSubject.asObservable();
  }

  constructor() { }

  async connexion(email: string, mdp: string): Promise<void> {
    // Vérifie si l'item n'a pas déjà été chargé
    if (!this._utilisateur) {
      const res = await directus.items('profil').readByQuery({
        filter: {
          email: {
            _eq: email
          },
          mdp: {
            _eq: this._mdpChiffre(mdp)
          },
        },
      });
      if (!res.data || !res.data.length) throw 'Pas de compte associé'
      this._utilisateur = Utilisateur.fromDirectusData(res.data[0]);
      this._$estConnecteSubject.next(true);
    }
  }



  async creationCompte(email: string, mdp: string, nom: string, prenom: string): Promise<void> {
    // Vérifie si l'item n'a pas déjà été chargé
    const res = await directus.items('profil').createOne(
      {
        email: email,
        mdp: this._mdpChiffre(mdp),
        nom: nom,
        prenom: prenom
      }
    );
    this._utilisateur = Utilisateur.fromDirectusData(res);
    this._$estConnecteSubject.next(true);
  }

  async modificationCompte(utilisateur: Utilisateur): Promise<void> {
    if (!this.utilisateurEstConnecte) throw 'Utilisateur non connecté';
    try {
      await directus.items('profil').updateOne(this._utilisateur!.id, utilisateur.toDirectusData);
      this._utilisateur = utilisateur;
    } catch (err) {
      console.log(err);
    }
  }

  async suppressionCompte(): Promise<void> {
    try {
      if (!this.utilisateurEstConnecte) throw 'Utilisateur non connecté';
      await directus.items('profil').deleteOne(this._utilisateur!.id);
      this.deconnexion();
    } catch (err) {
      console.log(err);
    }
  }

  deconnexion(): void {
    this._utilisateur = undefined;
    this._$estConnecteSubject.next(false);
  }

  bateauEstFavori(id: string): boolean {
    return this._utilisateur?.bateauFavorisId?.has(id) ?? false;
  }

  async changerBateauFavori(id: string): Promise<void> {
    if (this._utilisateur) {
      this.bateauEstFavori(id)
        ? this._utilisateur?.bateauFavorisId?.delete(id)
        : this._utilisateur?.bateauFavorisId?.add(id);
      await this.modificationCompte(this._utilisateur);
    }
  }

  private _mdpChiffre(mdp: string): string {
    return sha256(mdp);
  }

}
