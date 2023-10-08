import { injectable, inject } from "inversify";
import config from "../config.json";
import { EventManager, globalEvent } from "./EventManager";

export type catalogueItem = {
  url: string;
  name: string;
  color: string;
};

export type environments = {
  name: string;
  baseurl: string;
  color: string;
};

export interface IAppConfig {
  getCatalogueItem(name: string): catalogueItem | undefined;
  getCatalogueItems(): string[];
  getEnvironments(): environments[];
  getEnvironmentNames(): string[];
  getApplications(): string[];
}

@injectable()
export class AppConfig implements IAppConfig {
  private _catalogues: Map<string, catalogueItem> = new Map();
  private _environments: Map<string, environments> = new Map();
  private _eventManager: EventManager;

  constructor(@inject("EventManager") eventManager: EventManager) {
    this._eventManager = eventManager;
    this.initCatalogues();
    this.initEnvironments();
  }
  getApplications(): string[] {
    return ["datastore", "goman", "TRE"];
  }
  getEnvironmentNames(): string[] {
    return [...this._environments.keys()];
  }

  getEnvironments(): environments[] {
    return [...this._environments.values()];
  }

  getCatalogueItems(): string[] {
    return [...this._catalogues.keys()];
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

  private initEnvironments(): void {
    const data: environments[] = config.app.environments.items;

    data.forEach((item) => {
      if (!this._environments.has(item.name)) {
        this._environments.set(item.name, item);
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
