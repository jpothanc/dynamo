import BasicGrid from "../components/BasicGrid";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import config from "../config.json";
import * as helperJs from "../services/Helper";
import { useQuery } from "@tanstack/react-query";
import { dicontainer } from "../services/Container";
import { IAppConfig } from "../services/AppConfig";
import { CatalogueChangeEvent } from "../services/EventManager";
import { IEventManager } from "../services/EventManager";
import { Subscription } from "rxjs";

const DataView = () => {
  const [rowData, setRowData] = useState<any>([]);
  const [columnDefs, setcolumnDefs] = useState<any>([]);
  const [catalogueItem, setCatalogueItem] = useState<string>("");
  const [subscription, setsubscription] = useState<Subscription>();

  const eventManager = useMemo(
    () => dicontainer.get<IEventManager>("EventManager"),
    []
  );

  const appConfig = useMemo(() => dicontainer.get<IAppConfig>("AppConfig"), []);

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

  const { isLoading, error, data } = useQuery({
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

  // Access individual query parameters
  // const param1 = queryParams.get("param1");
  // const param2 = queryParams.get("param2");
  // console.log(param1);
  // console.log(param2);

  if (isLoading) return "Loading...";
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <BasicGrid
        columnDefs={columnDefs}
        rowData={rowData}
        theme={config.app.theme}
      />
    </>
  );
};

export default DataView;
