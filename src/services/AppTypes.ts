export type selectOption = {
  value: string;
  label: string;
};

export type catalogueItem = {
  url: string;
  name: string;
  color: string;
  source: string;
};

export type environment = {
  name: string;
  baseurl: string;
};

export type catalogue = {
  name: string;
  description: string;
  active: boolean;
  environments: environment[];
  catalogueItems: catalogueItem[];
};

export type CatalogueChangeEvent = {
  catalogue: string;
  catalogueItem: string;
};
export enum EventType {
  ENV_CHANGE = 1,
  CATALOGUE_CHANGE = 2,
  CATALOGUE_QUERY = 3,
}

export type globalEvent = {
  source: string;
  eventType: EventType;
  data: any;
};
