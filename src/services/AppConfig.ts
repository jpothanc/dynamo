import { injectable, inject } from "inversify";
import config from "../config.json";
import { EventManager } from "./EventManager";
import { environment, catalogue, catalogueItem } from "./Types";

export interface IAppConfig {
  getCatalogueItem(catalogue: string, name: string): catalogueItem | undefined;
  getCatalogueItems(catalogue: string): string[] | undefined;
  getCatalogues(): string[];

  getEnvironments(): environment[];
  getEnvironmentNames(): string[];
  getEnvironment(name: string): environment | undefined;
}

@injectable()
export class AppConfig implements IAppConfig {
  private _catalogue: Map<string, catalogue> = new Map();
  private _catalogueItems: Map<string, Map<string, catalogueItem>> = new Map();
  private _environments: Map<string, environment> = new Map();
  private _eventManager: EventManager;

  constructor(@inject("EventManager") eventManager: EventManager) {
    this._eventManager = eventManager;
    this.initCatalogues();
    this.initEnvironments();
  }
  private initCatalogues(): void {
    const data: catalogue[] = config.app.catalogues.items;
    console.log("initCatalogues");

    data.forEach((app) => {
      if (!this._catalogue.has(app.name) && app.active) {
        this._catalogue.set(app.name, app);

        app.catalogueItems?.forEach((item) => {
          if (!this._catalogueItems.has(app.name)) {
            var map = new Map<string, catalogueItem>();
            map.set(item.name, item);
            this._catalogueItems.set(app.name, map);
          } else {
            this._catalogueItems.get(app.name)?.set(item.name, item);
          }
        });

        //override/set environments, if any
        app.environments?.forEach((item) => {
          if (this._environments.has(item.name)) {
            this._environments.delete(item.name);
          }
          this._environments.set(item.name, item);
        });
      }
    });
  }

  private initEnvironments(): void {
    const data: environment[] = config.app.environments;

    data.forEach((item) => {
      if (!this._environments.has(item.name)) {
        this._environments.set(item.name, item);
      }
    });
  }

  getEnvironment(name: string): environment | undefined {
    return this._environments.has(name)
      ? this._environments.get(name)
      : undefined;
  }

  getCatalogues(): string[] {
    return ["trading", "baskets"];
  }

  getEnvironmentNames(): string[] {
    return [...this._environments.keys()];
  }

  getEnvironments(): environment[] {
    return [...this._environments.values()];
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
