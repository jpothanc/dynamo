export type selectOption = {
  value: string;
  label: string;
};

export type environment = {
  name: string;
  baseurl: string;
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
