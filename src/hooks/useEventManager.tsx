import { dicontainer } from "../services/Container";
import { IEventManager } from "../services/EventManager";
import { useMemo } from "react";

export const useEventManager
 = () => {
  const eventManager = useMemo(
    () => dicontainer.get<IEventManager>("EventManager"),
    []
  );
  return eventManager;
};
