import ResponsivtVindu from "./ResponsivtVindu";
import HamburgerMeny from "./HamburgerMeny/HamburgerMeny";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style/App.css";
import "./style/Sidebar.css";
import "./style/GeografiskSidebar.css";
import "./style/Kartlag.css";
import "./style/FargeMenyer.css";
import Grunnkart from "./Grunnkart/Grunnkart";
import ForsideInformasjon from "./Informasjon/ForsideInformasjon";
import SettingsContainer from "./SettingsContainer";

const App = () => {
  return (
    <BrowserRouter baseName={process.env.PUBLIC_URL}>
      <SettingsContainer>
        <ResponsivtVindu>
          <Grunnkart />
          <ForsideInformasjon />
          <HamburgerMeny />
        </ResponsivtVindu>
      </SettingsContainer>
    </BrowserRouter>
  );
};

export default App;
