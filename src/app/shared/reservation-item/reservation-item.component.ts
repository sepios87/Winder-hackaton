import { Component, Input, OnInit } from '@angular/core';
import { Bateau } from 'src/app/models/bateau';
import { Reservation } from 'src/app/models/reservation';
import { BateauService } from 'src/app/services/bateau.service';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss']
})
export class ReservationItemComponent implements OnInit {

  @Input() reservation?:Reservation;
  
  bateau?: Bateau; 
  constructor( private _bateauService: BateauService) { }

  ngOnInit(): void {
    this.getBateau(); 
  }

  private async getBateau(){
    this.bateau = await this._bateauService.afficherBateauAvecId(this.reservation!.bateauId); 
    console.log('coucou toi ', this.bateau)

  }
}
