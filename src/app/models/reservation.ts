export class Reservation {

    constructor(
        public readonly dateDebut: Date,
        public readonly dateFin: Date,
        public readonly bateauId: string,
        public readonly profilId: string,
        public readonly prix: number,
        public readonly id?: string,
    ) { }

    public static fromDirectusData(data: any): Reservation {
        return new Reservation(
            new Date(data.date_debut),
            new Date(data.date_fin),
            data.bateau,
            data.profil,
            data.prix,
            data.id,
        );
    }

    get toDirectusData(): any {
      return {
        date_debut: this.dateDebut,
        date_fin: this.dateFin,
        bateau: this.bateauId,
        profil: this.profilId,
        prix: this.prix
      }
    }

}
