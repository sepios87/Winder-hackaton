import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSendForm = false;
  isConnexionError = false;
  constructor(private formBuilder : FormBuilder, private _utilisateurService : UtilisateurService, private _router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  async login() {
    this.isSendForm = true;
    if (this.form.valid)
    {
      try {
        await this._utilisateurService.connexion(this.form.value.email, this.form.value.password);
        this._router.navigate(['/bateaux']);
      }
      catch (e)
      {
        this.isConnexionError = true;
      }
    }
  }

}
