import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";
import { useEffect, useState } from "react";

import {
  EventType,
  globalEvent,
  CatalogueChangeEvent,
} from "../services/AppTypes";

export const Buttons = () => {
  const [catalogue, setCatalogue] = useState("jsonplaceholder");
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventData: CatalogueChangeEvent = {
      catalogue: catalogue,
      catalogueItem: (event.target as HTMLInputElement).name,
    };
    eventManager.emitEvent(eventData);
  };

  useEffect(() => {
    const subscription = eventManager
      .globalEvent()
      .subscribe((event: globalEvent) => {
        if (event.eventType == EventType.Catalogue_Change) {
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
