import { Component, Input, OnInit } from '@angular/core';
import { Bateau } from 'src/app/models/bateau';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  @Input() bateau?: Bateau;

  isLiked: boolean = false;

  constructor(
    private _utilisateurService: UtilisateurService,
    private _toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.refreshLike();
  }

  refreshLike() {
    if (this.bateau) {
      this.isLiked = this._utilisateurService.bateauEstFavori(this.bateau?.id);
    }
  }

  async toggleLike(event: any): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (this._utilisateurService.utilisateurEstConnecte) {
      await this._utilisateurService.changerBateauFavori(this.bateau!.id);
      this.refreshLike();
    } else {
      this._toast.show('Il faut se connecter pour pouvoir mettre en favoris matelot !', { icon: '🚤' });
    }
  }

}
