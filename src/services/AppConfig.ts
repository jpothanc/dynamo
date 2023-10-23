import { injectable } from "inversify";
import config from "../config.json";
import { environment, catalogue, catalogueItem } from "./Types";

export interface IAppConfig {
  getCatalogueItem(catalogue: string, name: string): catalogueItem | undefined;
  getCatalogueItems(catalogue: string): string[] | undefined;
  getCatalogues(): string[];

  getEnvironments(catalogue: string): environment[];
  getEnvironment(atalogue: string, name: string): environment | undefined;
}

@injectable()
export class AppConfig implements IAppConfig {
  private _catalogue: Map<string, catalogue> = new Map();
  private _catalogueItems: Map<string, Map<string, catalogueItem>> = new Map();
  private _catalogueEnvironments: Map<string, Map<string, environment>> =
    new Map();

  constructor() {
    this.initCatalogues();
  }
  private initCatalogues(): void {
    const data = config.app.catalogues.items as catalogue[];
    console.log("initCatalogues");

    data.forEach((catalogue) => {
      if (!this._catalogue.has(catalogue.name) && catalogue.active) {
        this._catalogue.set(catalogue.name, catalogue);

        catalogue.catalogueItems?.forEach((item) => {
          if (!this._catalogueItems.has(catalogue.name)) {
            var map = new Map<string, catalogueItem>();
            map.set(item.name, item);
            this._catalogueItems.set(catalogue.name, map);
          } else {
            this._catalogueItems.get(catalogue.name)?.set(item.name, item);
          }
        });

        //override/set environments, if any
        catalogue.environments?.forEach((item) => {
          if (!this._catalogueEnvironments.has(catalogue.name)) {
            this._catalogueEnvironments.set(catalogue.name, new Map());
          }
          var env = this._catalogueEnvironments.get(catalogue.name);
          if (!env?.has(item.name)) {
            env?.set(item.name, item);
          }
        });
      }
    });
  }

  getEnvironment(catalogue: string, name: string): environment | undefined {
    if (this._catalogueEnvironments.has(catalogue)) {
      const environments = this._catalogueEnvironments.get(catalogue);
      if (environments != undefined) return environments.get(name);
    }
    return undefined;
  }

  getCatalogues(): string[] {
    return [...this._catalogue.keys()];
  }

  getEnvironments(catalogue: string | undefined): environment[] {
    if (catalogue == undefined) return [];
    if (this._catalogueEnvironments.has(catalogue)) {
      const environments = this._catalogueEnvironments.get(catalogue);
      if (environments != undefined) return [...environments.values()];
    }
    return [];
  }

  getCatalogueItems(catalogue: string): string[] | undefined {
    if (this._catalogueItems.has(catalogue)) {
      var items = this._catalogueItems.get(catalogue);
      if (items != undefined) {
        return [...items.keys()];
      }
    }

    return undefined;
  }

  getCatalogueItem(catalogue: string, name: string): catalogueItem | undefined {
    if (this._catalogueItems.has(catalogue)) {
      return this._catalogueItems.get(catalogue)?.get(name);
    }
    return undefined;
  }
}
