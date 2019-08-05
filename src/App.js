import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/Kart.css";
import "./style/App.css";
import "./style/Sidebar.css";
import "./style/GeografiskSidebar.css";
import "./style/Kartlag.css";
import "./style/FargeMenyer.css";
import Grunnkart from "./Grunnkart/Grunnkart";
import ForsideInformasjon from "./Forside/ForsideInformasjon";
import SettingsContainer from "./SettingsContainer";
import HamburgerMeny from "./HamburgerMeny/HamburgerMeny";
import MobileNavigation from "MobileNavigation/MobileNavigation";
const App = () => {
  return (
    <BrowserRouter baseName={process.env.PUBLIC_URL}>
      <SettingsContainer>
        <Grunnkart />
        <ForsideInformasjon />

        <MobileNavigation />
        <HamburgerMeny />
      </SettingsContainer>
    </BrowserRouter>
  );
};

export default App;
