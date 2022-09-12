import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  filtreForm: FormGroup = this._fb.group({
    prix: [0],
    couchage: [0, Validators.min(0)],
    nbPersonnes: [0, Validators.min(0)],
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  ajouterUn(input: any): void {
    this.filtreForm.get(input)?.patchValue(this.filtreForm.get(input)?.value + 1);
  }

  enleverUn(input: any): void {
    if (this.filtreForm.get(input)?.value > 0)
      this.filtreForm.get(input)?.patchValue(this.filtreForm.get(input)?.value - 1)
  }

  filtrer(): void {
    this._router.navigateByUrl('/bateaux', { state: {form : this.filtreForm.value} });
  }
}
