import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chargement',
  templateUrl: './chargement.component.html',
  styleUrls: ['./chargement.component.scss']
})
export class ChargementComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    setTimeout(() => {
      this._router.navigate(['accueil']);
    }, 3000)
  }
}
