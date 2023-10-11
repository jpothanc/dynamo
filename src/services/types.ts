export type selectOption = {
  value: string;
  label: string;
};

export type catalogueItem = {
  url: string;
  name: string;
  color: string;
};

export type environment = {
  name: string;
  baseurl: string;
  color: string;
};

export type catalogue = {
  name: string;
  description: string;
  active: boolean;
  catalogueItems: catalogueItem[];
};

export type CatalogueChangeEvent = {
  catalogue: string;
  catalogueItem: string;
};
export enum EventType {
  Environment_Change = 1,
  Catalogue_Change = 2,
}

export type globalEvent = {
  source: string;
  eventType: EventType;
  data: any;
};
