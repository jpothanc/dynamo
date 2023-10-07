import { CatalogueChangeEvent } from "../services/EventManager";
import { useEventManager } from "../hooks/useEventManager";
import { useAppConfig } from "../hooks/useAppConfig";

export const Buttons = () => {
  const eventManager = useEventManager();
  const appConfig = useAppConfig();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button Clicked :" + event.target.name);
    const eventData: CatalogueChangeEvent = {
      catalogueItem: event.target.name,
    };

    eventManager.emitEvent(eventData);
  };
  return (
    <>
      <div>
        {appConfig.getCatalogueItems().map((key) => {
          return (
            <button
              className="btn"
              key={key}
              name={key}
              onClick={onButtonClick}
            >
              {key}
            </button>
          );
        })}
      </div>
    </>
  );
};
