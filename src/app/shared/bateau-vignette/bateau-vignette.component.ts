import {Component, Input, OnInit} from '@angular/core';
import { Bateau } from 'src/app/models/bateau';

@Component({
  selector: 'app-bateau-vignette',
  templateUrl: './bateau-vignette.component.html',
  styleUrls: ['./bateau-vignette.component.scss']
})
export class BateauVignetteComponent implements OnInit {

  @Input() bateau?: Bateau;

  constructor() { }

  ngOnInit(): void {
  }

}
