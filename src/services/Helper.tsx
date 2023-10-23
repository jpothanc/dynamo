import { dicontainer } from "../services/Container";
import { IGlobalStates } from "../services/GlobalStates";
import { environment, selectOption } from "./AppTypes";

export function toColumnDefs(cols: string[]): any {
  const colDefs: any = [];
  cols.forEach((c) => {
    colDefs.push({
      field: c,
      resizable: true,
      tooltipField: c,
    });
  });
  return colDefs;
}

export async function getData(
  baseurl: string | undefined,
  url: string | undefined
): Promise<any> {
  console.log("Querying:" + baseurl + url);
  if (baseurl == undefined) throw new Error("baseurl not defined.");
  if (url == undefined) throw new Error("url not defined.");

  return await fetch(baseurl + url).then((response) => response.json());
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function getEnvOptions(environment: environment[]): selectOption[] {
  const options: selectOption[] = [];

  environment.forEach((item) => {
    options.push({
      value: item.name,
      label: item.name,
    });
  });
  return options;
}

export function getCatalogueOptions(catalogues: string[]): selectOption[] {
  const options: selectOption[] = [];
  catalogues.forEach((item) => {
    options.push({
      value: item,
      label: item,
    });
  });
  return options;
}

export function getDefaultEnvironment(): selectOption {
  var globalStates = dicontainer.get<IGlobalStates>("GlobalStates");
  return {
    value: globalStates.getEnvironment(),
    label: globalStates.getEnvironment(),
  };
}
export function getDefaultCatalogue(): selectOption {
  var globalStates = dicontainer.get<IGlobalStates>("GlobalStates");
  return {
    value: globalStates.getCatalogue(),
    label: globalStates.getCatalogue(),
  };
}
