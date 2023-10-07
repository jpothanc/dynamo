import { CatalogueChangeEvent } from "../services/EventManager";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";

export const Buttons = () => {
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventData: CatalogueChangeEvent = {
      catalogueItem: event.target.name,
    };
    eventManager.emitEvent(eventData);
  };
  
  return (
    <>
      <div>
        {appConfig.getCatalogueItems().map((key) => {
          var item = appConfig.getCatalogueItem(key);
          return (
            <button
              className="btn"
              key={key}
              name={key}
              onClick={onButtonClick}
              style={{ backgroundColor: item?.color }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </>
  );
};
