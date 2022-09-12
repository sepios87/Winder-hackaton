import { Component, OnInit } from '@angular/core';
import {latLng, tileLayer} from "leaflet";
import {Itineraire} from "../../models/itineraire";
import {ActivatedRoute} from "@angular/router";
import {ItineraireService} from "../../services/itineraire.service";

@Component({
  selector: 'app-parcours-description',
  templateUrl: './parcours-description.component.html',
  styleUrls: ['./parcours-description.component.scss']
})
export class ParcoursDescriptionComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(46.148271, -1.161876)
  };

  itineraire?: Itineraire;

  constructor(private _activatedRouter: ActivatedRoute, private _itineraireService: ItineraireService) { }

  ngOnInit(): void {
    this.afficherItineraire();
  }

  afficherItineraire() {
    const id = this._activatedRouter.snapshot.paramMap.get('id');
    this._itineraireService.afficherItineraireParId(id).then(data => this.itineraire = data);
  }

}
