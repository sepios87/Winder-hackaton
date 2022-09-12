import { Component, Input, OnInit } from '@angular/core';
import { Bateau } from '../../models/bateau';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.scss']
})
export class SpecificationsComponent implements OnInit {

  @Input() bateau?: Bateau;

  constructor() { }

  ngOnInit(): void {
  }

}
