import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilisateurService } from "../../services/utilisateur.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  isSendContactForm = false;
  msgErreur = ""; 

  // TODO: gerer les erreurs dans le formulaire html
  inscriptionForm: FormGroup = this._fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mdp: ['', [Validators.required]],
    mdp2: ['', [Validators.required]]
  })

  constructor(
    private _fb: FormBuilder,
    private _utilisateurService: UtilisateurService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  async creerCompte(): Promise<void> {
    const data = this.inscriptionForm.value;
    if (this.inscriptionForm.valid && data.mdp === data.mdp2) {
      try {
        await this._utilisateurService.creationCompte(data.email, data.mdp, data.nom, data.prenom);
        this._router.navigate(['/bateaux']);
      } catch {
        // TODO: ajouter toaster
      }
    }else{
      this.msgErreur = "Les mots de passes doivent être identiques"
    }
    this.isSendContactForm = true;
  }

}
