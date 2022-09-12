import { Asset } from "./asset";

export class Utilisateur {

    constructor(
        public readonly id: string,
        public email: string,
        public permis: boolean,
        public nom: string,
        public prenom: string,
        public bateauFavorisId: Set<string>,
        public reservationsId: string[],
        public avatar?: Asset,
    ) { }

    public static fromDirectusData(data: any): Utilisateur {
        return new Utilisateur(
            data.id,
            data.email,
            data.permis,
            data.nom,
            data.prenom,
            new Set(data.bateaux_favoris),
            data.reservation,
            data?.avatar && Asset.fromDirectusData(data.avatar)
        );
    }

    get toDirectusData(): any {
        return {
            email: this.email,
            permis: this.permis,
            nom: this.nom,
            prenom: this.prenom,
            bateaux_favoris: Array.from(this.bateauFavorisId),
            reservation: this.reservationsId,
            avatar: this.avatar
        }
    }

}
