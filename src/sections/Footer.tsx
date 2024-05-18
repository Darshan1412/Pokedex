import { signOut } from "firebase/auth";
import React from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { firebaseAuth } from "utils/firebaseConfig";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setPokemonTab, setToast, setUserStatus } from "app/slices/AppSlice";
import { pokemonTabs } from "utils/Constants";
import { useLocation } from "react-router-dom";
import { MdDescription, MdTimeline, MdPlace, MdDirections } from "react-icons/md";
import { FaDeaf, FaDna } from "react-icons/fa";
import { RiFileTextFill, RiExchangeFill, RiMapPin2Fill, RiSwordFill } from "react-icons/ri";

function Footer() {
  const dispatch = useAppDispatch();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);
  const location = useLocation();
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("You have logged out."));
  };

  const routes = [
    {
      name: pokemonTabs.description,
      icon: <MdDescription />,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      icon: <FaDna />, 
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      icon: <MdPlace />,
      value: "Locations",
    },
    {
      name: pokemonTabs.moves,
      icon: <RiSwordFill />, 
      value: "Capable Moves",
    },
  ];

  const renderItems = () => {
    const isMobile = window.innerWidth <= 768;
    return routes.map((route) => {
      return (
        <li
          key={route.name}
          className={`${currentPokemonTab === route.name ? "active" : ""}`}
          onClick={() => {
            dispatch(setPokemonTab(route.name));
          }}
        >
          {isMobile ? route.icon : route.value}
        </li>
      );
    });
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <footer style={isMobile && location.pathname.includes("/pokemon") ? { gridTemplateColumns: 'none' } : {}}>
    {isMobile && location.pathname.includes("/pokemon") && (
      <div className="data">
        <ul>{renderItems()}</ul>
      </div>
    )}
    {!isMobile && location.pathname.includes("/pokemon") && (
      <>
        <div className="block"></div>
        <div className="data">
          <ul>{renderItems()}</ul>
        </div>
        <div className="block">
          <MdOutlinePowerSettingsNew onClick={handleLogout} />
        </div>
      </>
    )}
    {!location.pathname.includes("/pokemon") && (
      <>
      <div className="block"></div>
      <div className="data">
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
      </>
    )}
  </footer>
  
  );
}

export default Footer;

