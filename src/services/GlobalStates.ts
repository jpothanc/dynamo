import { injectable, inject } from "inversify";
import * as EventManager from "./EventManager";
import { globalEvent, EventType } from "../types/appTypes";

export interface IGlobalStates {
  setCatalogue(catalogue: string): void;
  getCatalogue(): string;
  setEnvironment(env: string): void;
  getEnvironment(): string;
  onGlobalEvent(event: globalEvent): void;
}

@injectable()
export class GlobalStates implements IGlobalStates {
  private _catalogue: string = "";
  private _environment: string = "";
  private _eventManager: EventManager.IEventManager;

  constructor(
    @inject("EventManager") eventManager: EventManager.IEventManager
  ) {
    this._catalogue = "media";
    this._environment = "development";
    this._eventManager = eventManager;
    this._eventManager.eventBus().subscribe(this.onGlobalEvent);
  }

  onGlobalEvent(event: globalEvent): void {
    switch (event.eventType) {
      case EventType.CATALOGUE_CHANGE:
        this._catalogue = event.data.value;
        break;
      case EventType.ENV_CHANGE:
        this._environment = event.data.value;
        break;
      default:
        break;
    }
  }

  setCatalogue(catalogue: string): void {
    this._catalogue = catalogue;
  }

  getCatalogue(): string {
    return this._catalogue;
  }

  setEnvironment(env: string): void {
    this._environment = env;
  }

  getEnvironment(): string {
    return this._environment;
  }
}
