import { injectable, inject } from "inversify";
import * as EventManager from "./EventManager";

export interface IGlobalStates {
  setCatalogue(catalogue: string): void;
  getCatalogue(): string;

  setEnvironment(env: string): void;
  getEnvironment(): string;
  onGlobalEvent(event: EventManager.globalEvent): void;
}

@injectable()
export class GlobalStates implements IGlobalStates {
  private _catalogue: string = "";
  private _environment: string = "";
  private _eventManager: EventManager.IEventManager;

  constructor(
    @inject("EventManager") eventManager: EventManager.IEventManager
  ) {
    this._catalogue = "trading";
    this._environment = "development";
    this._eventManager = eventManager;
    this.start();
  }

  async start(): Promise<void> {
    this._eventManager.globalEvent().subscribe(this.onGlobalEvent);
  }

  onGlobalEvent(event: EventManager.globalEvent): void {
    switch (event.eventType) {
      case EventManager.EventType.Catalogue_Change:
        this._catalogue = event.data.value;
        break;
      case EventManager.EventType.Environment_Change:
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
