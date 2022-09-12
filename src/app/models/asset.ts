import { directus } from "../contants";

export class Asset {

  constructor(
    public readonly id?: string,
  ) { }

  public static fromDirectusData(data: string): Asset {
    return new Asset(data);
  }

  get getUrl(): string {
    return (
      `${directus.url}assets/${this.id}`
    );
  }

}
