import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retour',
  templateUrl: './retour.component.html',
  styleUrls: ['./retour.component.scss']
})
export class RetourComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  retour() {
    this.location.back();
  }

}
