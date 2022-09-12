import { Asset } from "./asset";

export class Bateau {

    constructor(
        public readonly id: string,
        public readonly nom: string,
        public readonly capacite: number,
        public readonly classe: string,
        public readonly prix: number,
        public readonly portId: string,
        public readonly typeId: string,
        public readonly images: Asset[],
        public readonly annee?: Date,
        public readonly couchage?: number,
        public readonly longueur?: number,
        public readonly largeur?: number,
        public readonly tirantEau?: number,
        public readonly typeVoile?: string,
    ) { }

    public static fromDirectusData(data: any): Bateau {
        return new Bateau(
            data.id,
            data.nom,
            data.capacite,
            data.classe,
            data.prix,
            data.port,
            data.type,
            data.images.map((image: any) => Asset.fromDirectusData(image.directus_files_id)),
            data?.annee,
            data?.couchage,
            data?.longueur,
            data?.largeur,
            data?.tirant_eau,
            data?.type_voile,
        );
    }

}
