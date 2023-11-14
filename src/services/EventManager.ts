import { Subject } from "rxjs";
import { injectable } from "inversify";
import { EventType, globalEvent } from "../types/appTypes";

export interface IEventManager {
  eventBus(): Subject<any>;
  publishEvent(source: string, eventType: EventType, eventData: any): void;
}

@injectable()
export class EventManager implements IEventManager {
  private _eventBus = new Subject<globalEvent>();

  constructor() {
    console.log("EventManager Initialized");
  }
  eventBus(): Subject<globalEvent> {
    return this._eventBus;
  }
  publishInternal(data: globalEvent): void {
    this._eventBus.next(data);
  }
  publishEvent(source: string, eventType: EventType, eventData: any): void {
    var globalEvent: globalEvent = {
      source: source,
      eventType: eventType,
      data: eventData,
    };
    this._eventBus.next(globalEvent);
  }
}
