import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import { Combo } from "./Combo";
import * as helperJs from "../lib/helper";
import { useAppConfig } from "../hooks/useAppConfig";
import { EventType, globalEvent, selectOption } from "../types/appTypes";
import { useEventManager } from "../hooks/useEventManager";
import { useGlobalStates } from "../hooks/useGlobalStates";
import { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { FaRegSun } from "react-icons/fa6";
import config from "../config/config.json";

const NavBar = () => {
  const [catalogue, setCatalogue] = useState("jsonplaceholder");

  const appConfig = useAppConfig();
  const eventManager = useEventManager();
  const globalStates = useGlobalStates();

  const handleSelectionChange = (
    source: string,
    eventType: EventType,
    selectedOption: SingleValue<selectOption>
  ) => {
    console.log("handleSelectionChange");
    var eventData: globalEvent = {
      source: source,
      eventType: eventType,
      data: selectedOption,
    };

    eventManager.publishEvent(source, eventType, selectedOption);
    //global states subscring to the global event some how does not
    //update the data, hence calling it explicitly. Will look at later.
    globalStates.onGlobalEvent(eventData);
  };

  useEffect(() => {
    const subscription = eventManager
      .eventBus()
      .subscribe((event: globalEvent) => {
        if (event.eventType == EventType.CATALOGUE_CHANGE) {
          setCatalogue(event.data.value);
          console.log("catalogue change" + event.data.value);
        }
      });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="top-bar">
          <div className="top-bar__content">
            <nav className="nav" data-identifier="navStyle">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link className="nav__link" to="/">
                    Data
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className="nav__link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="list">
              <Combo
                name="catalogue"
                selectOptions={helperJs.getCatalogueOptions(
                  appConfig.getCatalogues()
                )}
                defaultSelectedItem={helperJs.getDefaultCatalogue()}
                onSelectionChange={(selectOption) =>
                  handleSelectionChange(
                    "catalogue",
                    EventType.CATALOGUE_CHANGE,
                    selectOption
                  )
                }
              />
              <Combo
                name="environment"
                selectOptions={helperJs.getEnvOptions(
                  appConfig.getEnvironments(catalogue)
                )}
                defaultSelectedItem={helperJs.getDefaultEnvironment()}
                onSelectionChange={(selectOption) =>
                  handleSelectionChange(
                    "catalogue",
                    EventType.ENV_CHANGE,
                    selectOption
                  )
                }
              />
            </div>

            <div className="support">
              <section className="phone">
                <i className="fa fa-phone icon" aria-hidden="true"></i>
                {config.app.supportNumber}
              </section>
              <section className="email">
                <i className="fa fa-envelope icon" aria-hidden="true"></i>
                {config.app.supportEmail}
              </section>
            </div>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="bottom-bar__content">
            <div className="banner">
              <a href="#" className="logo">
                <FaRegSun className="logo__img" size="32px" />
                <span className="logo__text">Dynamo</span>
              </a>
            </div>
            <Buttons />
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
