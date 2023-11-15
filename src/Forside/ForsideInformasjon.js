import React from "react";
import { withRouter } from "../withRouter";
import "../style/Forside.scss";
import Kilder from "./Kilder";
import Utforsk from "../HamburgerMeny/Utforsk/Utforsk";
import { useNavigate } from "react-router";

const ForsideInformasjon = ({onToggleHovedMeny}) => {
  const { navigate } = useNavigate();
  return (
    <div className="frontpage">
      <div className="frontpage_body">
        <div
          className="frontpage_header"
          onClick={e => {
            e.stopPropagation();
            navigate("/Natur_i_Norge/");
          }}
        >
          <div className="frontpage_icon">
            <img
              src="/logoer/small_icon_grey_two.png"
              className="logo_image_frontpage"
              alt="artsdatabanken logo"
            />{" "}
          </div>
          <div>
            <h1>NiN-Kart</h1>
            <h2>Natur i Norge</h2>
          </div>
        </div>

        <div className="frontpage_feature_block">
          <div className="frontpage_feature_container">
            <img src="/logoer/logo_hvit.svg" alt="" />
            <div>
              <h2>Hva er Natur i Norge?</h2>
              <p>
                Natur i Norge (NiN) er et type- og beskrivelsessystem for
                naturvariasjon.
                <br />
                <a
                  href="https://www.artsdatabanken.no/NiN"
                  className="inverted_link"
                >
                  https://www.artsdatabanken.no/NiN
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="frontpage_link_items">
          <h2>Utforsk NiN-kart via ikonene nedenfor</h2>
          <Utforsk onToggleHovedMeny={onToggleHovedMeny} />
        </div>
      </div>
      <div className="frontpage_footer">
        <div className="frontpage_sources">
          <a
            href="https://www.artsdatabanken.no/"
            className="artsdatabanken_logo"
          >
            <img
              src="https://data.artsdatabanken.no/Datakilde/Artsdatabanken/logo_med_navn_408.png"
              alt="Artsdatabanken logo"
            />
          </a>
        </div>

        <Kilder />
      </div>
    </div>
  );
};

export default withRouter(ForsideInformasjon);
