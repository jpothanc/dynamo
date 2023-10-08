import { CatalogueChangeEvent } from "../services/EventManager";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";
import StyledButton from "../globalStyles";
import { useEffect } from "react";
import { globalEvent } from "../services/EventManager";

export const Buttons = () => {
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventData: CatalogueChangeEvent = {
      catalogueItem: event.target.name,
    };
    eventManager.emitEvent(eventData);
  };

  useEffect(() => {
    eventManager.globalEvent().subscribe((eventData: globalEvent) => {
      console.log("globalEvent:Buttons:" + eventData.name);
    });

    return () => {};
  }, []);

  return (
    <>
      <div>
        {appConfig.getCatalogueItems().map((key) => {
          var item = appConfig.getCatalogueItem(key);
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
