import { Position } from './position';

export class Port {

    constructor(
        public readonly id: string,
        public readonly nom: string,
        public readonly position: Position,
    ) { }

    public static fromDirectusData(data: any): Port {
        return new Port(
            data.nom,
            data.nom,
            data.position
        );
    }

}
