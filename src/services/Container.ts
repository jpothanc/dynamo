import { Container } from "inversify";
import { IAppConfig, AppConfig } from "./AppConfig";
import { IEventManager, EventManager } from "./EventManager";
import { IGlobalStates, GlobalStates } from "./GlobalStates";

export const dicontainer = new Container();
dicontainer.bind<IAppConfig>("AppConfig").to(AppConfig).inSingletonScope();
dicontainer
  .bind<IEventManager>("EventManager")
  .to(EventManager)
  .inSingletonScope();
dicontainer
  .bind<IGlobalStates>("GlobalStates")
  .to(GlobalStates)
  .inSingletonScope();
