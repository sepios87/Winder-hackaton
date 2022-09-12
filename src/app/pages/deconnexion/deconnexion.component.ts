import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../../services/utilisateur.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent implements OnInit {

  constructor(private _utilisateurService : UtilisateurService, private _router : Router) { }

  ngOnInit(): void {
    this.logout()
  }

  async logout() {
    this._utilisateurService.deconnexion()
    this._router.navigate(['/accueil']);
  }

}
