import React from "react";
import { Landscape } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import fixSearchParams from "AppSettings/AppFunksjoner/fixSearchParams";

function roundToX(num, x) {
  return +(Math.round(num + "e+" + x) + "e-" + x);
}

const PopUp = ({ parent, path }) => {
  return (
    <div
      className="popup"
      style={{
        transform:
          "translate3d(" +
          parent.state.windowXpos +
          "px, " +
          parent.state.windowYpos +
          "px, 0px)"
      }}
    >
      <button
        className="invisible_icon_button"
        onClick={e => {
          parent.setState({
            showPopup: !parent.state.showPopup
          });
        }}
      >
        x
      </button>
      {parent.state.koordinat && (
        <>
          lat: {roundToX(parent.state.koordinat[0], 5)}, lng:{" "}
          {roundToX(parent.state.koordinat[1], 5)}
          <br />
        </>
      )}

      {parent.state.sted && (
        <>
          {parent.state.sted} <br />
        </>
      )}

      {parent.state.data ? (
        <>
          {parent.state.data.kommune && (
            <b>{språk(parent.state.data.kommune.tittel)}</b>
          )}
          {parent.state.data.kommune && parent.state.data.fylke && (
            <b>{", "} </b>
          )}
          {parent.state.data.fylke && (
            <b>
              {språk(parent.state.data.fylke.tittel)} <br />
            </b>
          )}
          {parent.state.data.landskap &&
            parent.props.forvaltningsportal !== "true" && (
              <>
                <Landscape /> {språk(parent.state.data.landskap.tittel)} <br />
              </>
            )}
        </>
      ) : (
        "Ingen data funnet"
      )}
      {parent.props.forvaltningsportal !== "true" && (
        <>
          <button
            className="link_to_page"
            onClick={e => {
              parent.props.handleFullscreen(false);
              parent.props.history.push(
                parent.state.buttonUrl + "?informasjon"
              );
            }}
          >
            Gå til all info om dette punktet
          </button>
          <br />
        </>
      )}
      <button
        className="link_to_page"
        onClick={e => {
          parent.removeMarker();
          parent.props.handleLokalitetUpdate(null);
          parent.props.history.push(fixSearchParams(path));

          parent.setState({
            showPopup: !parent.state.showPopup
          });
        }}
      >
        Fjern lokalitet
      </button>
    </div>
  );
};

export default PopUp;
