import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";
import { useEffect, useState } from "react";
import {
  EventType,
  globalEvent,
  CatalogueChangeEvent as CatalogueQueryEvent,
} from "../types/appTypes";

export const Buttons = () => {
  const [catalogue, setCatalogue] = useState("media");
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cEvent: CatalogueQueryEvent = {
      catalogue: catalogue,
      catalogueItem: (event.target as HTMLInputElement).name,
    };

    eventManager.publishEvent("button", EventType.CATALOGUE_QUERY, cEvent);
  };

  useEffect(() => {
    const subscription = eventManager
      .eventBus()
      .subscribe((event: globalEvent) => {
        if (event.eventType == EventType.CATALOGUE_CHANGE) {
          setCatalogue(event.data.value);
        }
      });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="btn-container">
        {appConfig.getCatalogueItems(catalogue)?.map((key) => {
          var item = appConfig.getCatalogueItem(catalogue, key);
          return (
            <button
              className="btn"
              style={{
                background: item?.color,
              }}
              key={key}
              name={key}
              onClick={(e) => onButtonClick(e)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </>
  );
};
