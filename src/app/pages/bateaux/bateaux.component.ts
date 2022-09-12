import { Component, OnInit } from '@angular/core';
import { Bateau } from 'src/app/models/bateau';
import { Utilisateur } from 'src/app/models/utilisateur';
import { BateauService } from 'src/app/services/bateau.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-bateaux',
  templateUrl: './bateaux.component.html',
  styleUrls: ['./bateaux.component.scss']
})
export class BateauxComponent implements OnInit {

  utilisateur?: Utilisateur;
  formFilter?: any;

  private _bateaux: Bateau[] = [];

  constructor(
    private _bateauService: BateauService,
    private _utilisateurService: UtilisateurService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.formFilter = window.history.state.form;
    this._getBateaux();
    if (this._utilisateurService.utilisateurEstConnecte) {
      this.utilisateur = this._utilisateurService.utilisateur;
    }
  }

  private _getBateaux() {
    this._bateauService.afficherBateaux().then(bateaux => {
      this._bateaux = bateaux;
      if (this.formFilter) {
        this._bateaux = this._bateaux.filter(bateau => {
          let hasReturn: boolean = false;
          if (this.formFilter.nbPersonnes > 0 && this.formFilter.nbPersonnes === bateau.capacite) {
            hasReturn = true;
          }
          if (this.formFilter.couchage > 0 && this.formFilter.couchage === bateau.couchage) {
            hasReturn = true;
          }
          if (this.formFilter.prix > 0 && this.formFilter.prix >= bateau.prix) {
            hasReturn = true;
          }
          return hasReturn;
        })
      }
    });
  }

  get bateauFavoris() {
    return this._bateaux.filter(e => this.utilisateur && this.utilisateur.bateauFavorisId?.has(e.id));
  }

  get autresBateau() {
    return this._bateaux.filter(e => !this.utilisateur || (this.utilisateur && !this.utilisateur.bateauFavorisId?.has(e.id)));
  }

}
