import { Subject } from "rxjs";
import { injectable } from "inversify";

export type CatalogueChangeEvent = {
  catalogue: string;
  catalogueItem: string;
};
export enum EventType {
  Environment_Change = 1,
  Catalogue_Change = 2,
}

export type globalEvent = {
  source: string;
  eventType: EventType;
  data: any;
};

export interface IEventManager {
  catalogueChangeEvent(): Subject<CatalogueChangeEvent>;
  emitEvent(data: CatalogueChangeEvent): void;

  globalEvent(): Subject<any>;
  emitGlobalEvent(data: globalEvent): void;
}

@injectable()
export class EventManager implements IEventManager {
  private _catalogueEventSubject = new Subject<CatalogueChangeEvent>();
  private _globalEventSubject = new Subject<globalEvent>();

  constructor() {
    console.log("EventManager Initialized");
  }
  globalEvent(): Subject<globalEvent> {
    return this._globalEventSubject;
  }

  emitGlobalEvent(data: globalEvent): void {
    this._globalEventSubject.next(data);
  }

  catalogueChangeEvent(): Subject<CatalogueChangeEvent> {
    return this._catalogueEventSubject;
  }

  emitEvent(data: CatalogueChangeEvent): void {
    console.log("emitEvent");
    this._catalogueEventSubject.next(data);
  }
}
