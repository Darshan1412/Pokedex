import React, { useEffect, useState } from "react";
import pokeballIcon from "assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");

  const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "Favorites",
      route: "/favorites",
    },
    {
      name: "About",
      route: "/about",
    },
  ];

  useEffect(() => {
    const currentRoute = location.pathname;
    setActiveRoute(currentRoute);
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    ul(index);
  }, [location.pathname, navigationRoutes]);

  function ul(index: number) {
    const underline = document.querySelectorAll<HTMLElement>(".underline");
    for (let i = 0; i < underline.length; i++) {
      underline[i].style.transform = "translate3d( " + index * 100 + "%, 0, 0)";
    }
  }

  const isMobile = window.innerWidth <= 768;
  
  return (
    <>
      <nav>
        <div className="block block1">
          <img
            src={pokeballIcon}
            alt="pokeball icon"
            onClick={() => navigate(`/search`)}
          />
        </div>
        {isMobile ? (
          <>
            <div className="block"></div>
            <div className="block block2" onClick={() => setMenuOpen(!menuOpen)}>
              <GiHamburgerMenu />
            </div>
          </>
        ) : (
          <div className="data">
            <ul>
              <div className="underline"></div>
              <div className="underline"></div>
              <div className="underline"></div>
              {navigationRoutes.map(({ name, route }, index) => (
                <Link to={route} key={index}>
                  <li className={route === activeRoute ? "active" : ""}>{name}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {menuOpen && (
        <div className="mobile-menu active">
          <ul>
            {navigationRoutes.map(({ name, route }, index) => (
              <Link to={route} key={index} onClick={() => setMenuOpen(false)}>
                <li className={route === activeRoute ? "active" : ""}>{name}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;