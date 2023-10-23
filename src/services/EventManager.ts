import { Subject } from "rxjs";
import { injectable } from "inversify";
import { globalEvent, CatalogueChangeEvent } from "./AppTypes";

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
