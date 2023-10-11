import BasicGrid from "../components/BasicGrid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../config.json";
import * as helperJs from "../services/Helper";
import * as reactQuery from "@tanstack/react-query";
import { Subscription } from "rxjs";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";
import { useGlobalStates } from "../hooks/useGlobalStates";
import { CatalogueChangeEvent } from "../services/types";

const DataView = () => {
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setcolumnDefs] = useState<any>([]);
  const [catalogue, setCatalogue] = useState<CatalogueChangeEvent | undefined>(
    undefined
  );
  const [subscription, setsubscription] = useState<Subscription>();
  const eventManager = useEventManager();
  const appConfig = useAppConfig();
  const globalStates = useGlobalStates();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    console.log("first");
    setsubscription(
      eventManager
        .catalogueChangeEvent()
        .subscribe((catalogue: CatalogueChangeEvent) => {
          console.log(
            "Catalogue Change Event Received : " +
              catalogue.catalogue +
              catalogue.catalogueItem
          );
          setCatalogue(catalogue);
        })
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [eventManager]);

  const queryKey =
    globalStates.getEnvironment() +
    ":" +
    catalogue?.catalogue +
    ":" +
    catalogue?.catalogueItem;

  // const queryClient = reactQuery.useQueryClient();

  // queryClient.invalidateQueries({ queryKey: [queryKey] });

  const { isLoading, error, data } = reactQuery.useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      if (
        catalogue?.catalogue != undefined &&
        catalogue?.catalogueItem != undefined
      ) {
        console.log(catalogue?.catalogue + "->" + catalogue?.catalogueItem);
        var item = appConfig.getCatalogueItem(
          catalogue?.catalogue,
          catalogue?.catalogueItem
        );
        var env = appConfig.getEnvironment(globalStates.getEnvironment());
        return helperJs
          .wait(1)
          .then(() => helperJs.getData(env?.baseurl, item?.url));
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setRowData(data);
      const keys = Object.keys(data[0]);
      setcolumnDefs(helperJs.toColumnDefs(keys));
      window.history.pushState(
        null,
        "",
        `?catalogue=${catalogue?.catalogue}&catalogueItem=${catalogue?.catalogueItem}`
      );
    }
  }, [data]);

  //const param1 = queryParams.get("item");
  //console.log("rendering" + param1);

  if (isLoading) return "Loading...";
  if (error) {
    console.log(error.message);
    return <div></div>;
  }

  return (
    <>
      <BasicGrid
        title={queryKey}
        columnDefs={columnDefs}
        rowData={rowData}
        theme={config.app.theme}
      />
    </>
  );
};

export default DataView;
