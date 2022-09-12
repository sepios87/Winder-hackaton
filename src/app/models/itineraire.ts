import { Position } from "./position";
import {Etape} from "./etape";

export class Itineraire {

    constructor(
        public readonly id: string,
        public readonly nom: string,
        public readonly duree: number,
        public readonly parcours: Etape[],
    ) { }

    public static fromDirectusData(data: any): Itineraire {
        return new Itineraire(
            data.id,
            data.nom,
            data.duree,
            data.parcours,
        );
    }

    get positionDepart(): Etape {
        return this.parcours[0];
    }

}
