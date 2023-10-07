import { Subject } from "rxjs";
import { injectable } from "inversify";

export type CatalogueChangeEvent = {
  catalogueItem: string;
};

export interface IEventManager {
  catalogueChangeEvent(): Subject<CatalogueChangeEvent>;
  emitEvent(data: CatalogueChangeEvent): void;
}

@injectable()
export class EventManager implements IEventManager {
  private _eventSubject = new Subject<CatalogueChangeEvent>();

  constructor() {
    console.log("EventManager Initialized");
  }

  catalogueChangeEvent(): Subject<CatalogueChangeEvent> {
    return this._eventSubject;
  }

  emitEvent(data: CatalogueChangeEvent): void {
    console.log("emitEvent");
    this._eventSubject.next(data);
  }
}
