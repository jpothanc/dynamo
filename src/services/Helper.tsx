import config from "../config.json";
import { catalogueItem } from "../services/AppConfig";

export function toColumnDefs(cols: string[]): any {
  const colDefs: any = [];
  cols.forEach((c) => {
    colDefs.push({
      field: c,
    });
  });
  return colDefs;
}

let catalogues: Record<string, catalogueItem> = {};

export function initCatalogues(): void {
  const data: catalogueItem[] = config.app.datastore.items;

  data.forEach((item) => {
    if (!catalogues.hasOwnProperty(item.name)) {
      catalogues[item.name] = item;
    }
    console.log(item);
  });
}

export async function getData1(name: string): Promise<any> {
  initCatalogues();
  if (catalogues.hasOwnProperty(name)) {
    var catalogue = catalogues[name];
    return await fetch(catalogue.url).then((response) => response.json());
  }

  throw new Error(`Catalogue Item not found ${name}`);
}

export async function getData(url: string | undefined): Promise<any> {
  if (url == undefined) throw new Error("url not defined.");
  return await fetch(url).then((response) => response.json());
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
