import React from "react";
import "style/Forvaltningsportalen.scss";
import {
  Search,
  HelpOutline,
  LinearScale,
  AddToPhotos
} from "@material-ui/icons";

const Forvaltningsportalen = props => {
  return (
    <div className="forvaltningsportalen frontpage_header">
      {false && (
        <div
          onClick={e => {
            props.history.push("/forvaltningsportalen");
          }}
        >
          <h1>
            <span>Økologisk Grunnkart</span> <b>forvaltningsportal</b>
          </h1>
        </div>
      )}
      <div className="forvaltningsportalen menylinje">
        <button>
          <AddToPhotos />
          Koble opp kartlag
        </button>
        <button>
          <LinearScale />
          Marker opp polygon
        </button>
        <button>
          <HelpOutline />
          Hjelp
        </button>
        <button>
          <Search /> Søk
        </button>
      </div>
    </div>
  );
};

export default Forvaltningsportalen;
