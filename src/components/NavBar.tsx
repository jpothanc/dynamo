import { Link } from "react-router-dom";
import { Buttons } from "./Buttons";
import { Combo } from "./Combo";

const NavBar = () => {
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
              <Combo name="environment" />
              <Combo name="applications" />
            </div>

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
            <Buttons />
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
