import React from "react";
import { Link } from "react-router-dom";
import { CatalogueChangeEvent } from "../services/EventManager";
import { dicontainer } from "../services/Container";
import { IEventManager } from "../services/EventManager";
import { useMemo } from "react";
const NavBar = () => {
  const eventManager = useMemo(
    () => dicontainer.get<IEventManager>("EventManager"),
    []
  );

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // debugger;
    console.log("Button Clicked :" + event.target.name);
    const eventData: CatalogueChangeEvent = {
      catalogueItem: event.target.name,
    };

    eventManager.emitEvent(eventData);
  };

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
            <div className="support">
              <section className="phone">
                <i className="fa fa-phone icon" aria-hidden="true"></i>
                1-800922-04444
              </section>
              <section className="email">
                <i className="fa fa-envelope icon" aria-hidden="true"></i>
                support@dynamo.com
              </section>
            </div>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="bottom-bar__content">
            <div className="banner">
              <a href="#" className="logo">
                <img src="/vite.svg" alt="logo" className="logo__img" />
                <span className="logo__text">Dynamo</span>
              </a>
            </div>
            <div>
              <button
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
              <button name="todo" onClick={onButtonClick}>
                ToDo
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
