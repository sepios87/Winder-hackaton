import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Bateau } from "../../models/bateau";
import { BateauService } from "../../services/bateau.service";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  bateaux: Bateau[] = [];

  optionsOwl: OwlOptions = {
    loop: true,
    center: true,
    dots: false,
    items: 1,
    margin: 20
  }

  constructor(
    private _bateauService: BateauService
  ) { }

  async ngOnInit(): Promise<void> {
    this.afficherMeilleuresOffres();
  }

  afficherMeilleuresOffres() {
    this._bateauService.afficherBateaux().then(data => {
      this.bateaux = data.slice(0, 3);
    });
  }



}
