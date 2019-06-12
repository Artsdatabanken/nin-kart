import React, { useState } from "react";
import { withRouter } from "react-router";
import "style/Forside.css";
import {
  CloudUpload,
  CloudDownload,
  Comment,
  Panorama,
  Info,
  Pets,
  Landscape,
  Layers,
  AssignmentInd
} from "@material-ui/icons";

const ForsideInformasjon = props => {
  const [showInfo, setShowInfo] = useState(true);
  if (props.location.pathname !== "/") return null;
  if (props.location.pathname !== "/") return null;
  return (
    <React.Fragment>
      {showInfo !== "turn off" && (
        <div
          className="frontpage"
          onClick={() => {
            props.history.push("/Natur_i_Norge/Landskap/");
            setShowInfo(false);
          }}
        >
          <div className="frontpage_header">
            <h1>
              <Layers /> NiN-Kart
            </h1>
            <h2>Natur i Norge</h2>
          </div>

          <div className="frontpage_ingress">
            Natur i Norge (NiN) er et type- og beskrivelsessystem for all
            variasjon i naturen. NiN håndterer variasjonen i alle naturmiljø i
            Norge, fra de store havdyp til de høyeste fjell, og fra Skagerrak i
            sør til Svalbard og Polhavet i nord. Les mer om prosjektet{" "}
            <a href="https://www.artsdatabanken.no/NiN">på nettsidene våre.</a>
            <br />
            <button>Gå til kart</button>
          </div>

          <div className="frontpage_footer">
            <img
              src="https://www.artsdatabanken.no/Files/20973"
              alt="Artsdatabanken logo"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(ForsideInformasjon);
