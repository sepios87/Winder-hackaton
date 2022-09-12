import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  estConnecte: boolean = false;
  menuEstOuvert: boolean = false;

  private _estConnecteSubscription?: Subscription;

  constructor(
    private _utilisateurService: UtilisateurService,
  ) { }

  ngOnInit(): void {
    this._estConnecteSubscription = this._utilisateurService.utilisateurEstConnecteObservable.subscribe(estConnecte => this.estConnecte = estConnecte);
  }

  ngOnDestroy(): void {
    this._estConnecteSubscription?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuEstOuvert = !this.menuEstOuvert;
  }

}
