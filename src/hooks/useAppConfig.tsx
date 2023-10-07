import { dicontainer } from "../services/Container";
import { IAppConfig } from "../services/AppConfig";
import { useMemo } from "react";

export const useAppConfig = () => {
  const appConfig = useMemo(() => dicontainer.get<IAppConfig>("AppConfig"), []);
  return appConfig;
};
;
;