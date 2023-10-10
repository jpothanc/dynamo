import { dicontainer } from "../services/Container";
import { IGlobalStates } from "../services/GlobalStates";
import { useMemo } from "react";

export const useGlobalStates = () => {
  var globalStates = useMemo(
    () => dicontainer.get<IGlobalStates>("GlobalStates"),
    []
  );
  return globalStates;
};
