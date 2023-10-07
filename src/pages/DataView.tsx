import BasicGrid from "../components/BasicGrid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../config.json";
import * as helperJs from "../services/Helper";
import * as reactQuery from "@tanstack/react-query";
import { CatalogueChangeEvent } from "../services/EventManager";
import { Subscription } from "rxjs";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";

const DataView = () => {
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setcolumnDefs] = useState<any>([]);
  const [catalogueItem, setCatalogueItem] = useState<string>("");
  const [subscription, setsubscription] = useState<Subscription>();
  const eventManager = useEventManager();
  const appConfig = useAppConfig();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    console.log("useEffect");
    setsubscription(
      eventManager
        .catalogueChangeEvent()
        .subscribe((ev: CatalogueChangeEvent) => {
          console.log("Catalogue Change Event Received : " + ev.catalogueItem);
          setCatalogueItem(ev.catalogueItem);
        })
    );

    return () => {
      console.log("unsubscribe events");
      subscription?.unsubscribe();
    };
  }, [eventManager]);

  const { isLoading, error, data } = reactQuery.useQuery({
    queryKey: [catalogueItem],
    queryFn: () => {
      var item = appConfig.getCatalogueItem(catalogueItem);
      return helperJs.wait(1).then(() => helperJs.getData(item?.url));
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setRowData(data);
      const keys = Object.keys(data[0]);
      setcolumnDefs(helperJs.toColumnDefs(keys));
      window.history.pushState(null, "", `?item=${catalogueItem}`);
    }
  }, [data]);

  const param1 = queryParams.get("item");
  console.log("rendering" + param1);

  if (isLoading) return "Loading...";
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <BasicGrid
        title={catalogueItem}
        columnDefs={columnDefs}
        rowData={rowData}
        theme={config.app.theme}
      />
    </>
  );
};

export default DataView;
