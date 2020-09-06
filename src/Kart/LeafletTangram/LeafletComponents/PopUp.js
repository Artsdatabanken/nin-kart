import React from "react";
import { Close, Landscape } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import fixSearchParams from "AppSettings/AppFunksjoner/fixSearchParams";
import { IconButton } from "@material-ui/core";
import { getKoordinatStreng } from "../../../koordinater";
import config from "../../../Funksjoner/config";

const PopUp = ({ parent, path }) => {
  if (!parent.state.data) return null;

  const koordinat = parent.state.koordinat;
  const { kommune, fylke, landskap, sted } = parent.state.data;
  return (
    <div
      onClick={(e) => {
        parent.setState({
          showPopup: !parent.state.showPopup,
        });
        parent.props.handleFullscreen(false);
        const url = new URL(parent.state.buttonUrl, config.dataUrl);
        url.searchParams.set("informasjon", "");
        const rel = url.toString().substring(url.origin.length);
        parent.props.history.push(rel);
      }}
      className="popup"
      style={{
        transform:
          "translate3d(" +
          parent.state.windowXpos +
          "px, " +
          parent.state.windowYpos +
          "px, 0px)",
      }}
    >
      <IconButton
        style={{ position: "absolute", right: 4, top: 4 }}
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          parent.removeMarker();
          parent.props.handleLokalitetUpdate(null);
          parent.props.history.push(fixSearchParams(path));

          parent.setState({
            showPopup: !parent.state.showPopup,
          });
        }}
      >
        <Close></Close>
      </IconButton>

      {getKoordinatStreng(koordinat)}
      <br />

      {sted && (
        <>
          {parent.state.sted} <br />
        </>
      )}

      {kommune && <b>{språk(kommune.tittel)}</b>}
      {kommune.tittel && fylke.tittel && <b>{", "} </b>}
      {fylke && (
        <b>
          {språk(fylke.tittel)} <br />
        </b>
      )}
      {landskap && (
        <>
          <Landscape /> {språk(landskap.tittel)} <br />
        </>
      )}
    </div>
  );
};

export default PopUp;
