import { CatalogueChangeEvent } from "../services/EventManager";
import { useEventManager } from "../hooks/useEventManager";

export const Buttons = () => {
  const eventManager = useEventManager();

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button Clicked :" + event.target.name);
    const eventData: CatalogueChangeEvent = {
      catalogueItem: event.target.name,
    };

    eventManager.emitEvent(eventData);
  };
  return (
    <div>
      <button
        className="btn"
        name="posts"
        onClick={(e) => {
          const eventData: CatalogueChangeEvent = {
            catalogueItem: e.target.name,
          };
          eventManager.emitEvent(eventData);
        }}
      >
        Posts
      </button>
      <button className="btn" name="todo" onClick={onButtonClick}>
        ToDo
      </button>
    </div>
  );
};
