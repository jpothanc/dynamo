import { CatalogueChangeEvent, EventType } from "../services/EventManager";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";
import StyledButton from "../globalStyles";
import { useEffect, useState } from "react";
import { globalEvent } from "../services/EventManager";
import { Subscription } from "rxjs";

export const Buttons = () => {
  const [subscription, setsubscription] = useState<Subscription>();
  const [catalogue, setCatalogue] = useState("");
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventData: CatalogueChangeEvent = {
      catalogue: catalogue,
      catalogueItem: event.target.name,
    };
    eventManager.emitEvent(eventData);
  };

  useEffect(() => {
    setsubscription(
      eventManager.globalEvent().subscribe((event: globalEvent) => {
        if (event.eventType == EventType.Catalogue_Change) {
          setCatalogue(event.data.value);
        }
      })
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        {appConfig.getCatalogueItems(catalogue)?.map((key) => {
          var item = appConfig.getCatalogueItem(catalogue, key);
          return (
            <StyledButton
              $backColor={item?.color}
              $color="white"
              key={key}
              name={key}
              onClick={onButtonClick}
            >
              {key}
            </StyledButton>
          );
        })}
      </div>
    </>
  );
};
