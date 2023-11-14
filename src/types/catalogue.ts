import { catalogueItem } from "./catalogueItem";
import { environment } from "./appTypes";

export type catalogue = {
  name: string;
  description: string;
  active: boolean;
  environments: environment[];
  catalogueItems: catalogueItem[];
};
