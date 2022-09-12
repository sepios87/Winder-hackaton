import { Component, OnInit } from '@angular/core';
import {circle, control, latLng, tileLayer} from "leaflet";
import {ItineraireService} from "src/app/services/itineraire.service";
import {Itineraire} from "src/app/models/itineraire";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.scss']
})
export class ParcoursComponent implements OnInit {

  constructor(private _itineraireService : ItineraireService, private _route : ActivatedRoute) { }

  itineraire ?: Itineraire;
  itineraires?: Itineraire[];
  layers: [] = [];
  ids: any[] = [];
  nextId?: string;

  ngOnInit(): void {
    this._route.params.subscribe(async (e)=> {
      this.itineraires = await this._itineraireService.afficherItineraires()
      for (const element of this.itineraires) {
        this.ids.push(element.id);
      }

      this.ids.sort()
      let indexActuel = this.ids.indexOf(parseInt(e['id']));
      this.nextId = this.ids[indexActuel+1];
      this.itineraire = await this._itineraireService.afficherItineraireParId(e['id'])
      this.initierCercle()
    });

  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(46.148271, -1.161876)
  };

  initierCercle()
  {
    this.layers = [];

    if (this.itineraire)
    {
      for (const etape of this.itineraire?.parcours) {
        // @ts-ignore
        this.layers.push(circle([etape.coordonnes.coordinates[1], etape.coordonnes.coordinates[0] ],
          {
            radius: 500,
            fillOpacity: 1,
            fillColor: '#006987',
            color:'#006987',
          }
        ));
      }
    }
  }
}
