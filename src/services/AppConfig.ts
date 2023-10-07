import { injectable } from "inversify";
import config from "../config.json";

export interface catalogueItem {
  url: string;
  name: string;
  color: string;
}

export interface IAppConfig {
  getCatalogueItem(name: string): catalogueItem | undefined;
}

@injectable()
export class AppConfig implements IAppConfig {
  private _catalogues: Map<string, catalogueItem> = new Map();

  constructor() {
    this.initCatalogues();
  }

  private initCatalogues(): void {
    const data: catalogueItem[] = config.app.datastore.items;

    data.forEach((item) => {
      if (!this._catalogues.has(item.name)) {
        this._catalogues.set(item.name, item);
      }
      console.log(item);
    });
  }

  getCatalogueItem(name: string): catalogueItem | undefined {
    if (this._catalogues.has(name)) {
      return this._catalogues.get(name);
    }
    return undefined;
  }
}
