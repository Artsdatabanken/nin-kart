import React from "react";
import språk from "../../Funksjoner/språk";
import isItalics from "../../Funksjoner/isItalics";
import Bildeavatar from "../../GjenbruksElement/Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import "../../style/NavMenu.scss";
import VelgFargeboks from "../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/VelgFargeBoks";
import {
  ChevronRight,
  VisibilityOutlined,
  VisibilityOffOutlined
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import constants from "../../constants";
import { getInterval } from "../../helpers";
import FargeVelger from "../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/FargeVelger";

class Kodelisteelement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showEditColor: false };
  }

  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true;
    if (np.value !== this.props.value) return true;
    if (np.opplyst !== this.props.opplyst) return true;
    return false;
  }

  render() {
    const {
      meta,
      visKode,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      areal,
      størsteAreal,
      setExpanded,
      onUpdateLayerProp
    } = this.props;

    const erSynlig = meta.hasOwnProperty("erSynlig") ? meta.erSynlig : true;
    const { kode, url, farge } = meta;

    let tittel = språk(meta.tittel);
    let sn = meta.tittel["sn"] && meta.tittel["sn"] === tittel;
    if (tittel === "undefined") {
      tittel = meta.tittel["sn"];
      sn = true;
    }

    const setShowEditColor = () => {
      this.setState({
        showEditColor: !this.state.showEditColor
      });
    };

    return (
      <div className="map_layer_navigation">
        <VelgFargeboks
          farge={farge}
          kode={kode}
          setShowEditColor={setShowEditColor}
        />
        {this.state.showEditColor && (
          <FargeVelger
            color={farge}
            onUpdateLayerProp={onUpdateLayerProp}
            where={kode}
            elementType={"barn"}
          />
        )}

        <button
          key={kode}
          onClick={() => {
            setExpanded(false);
            onNavigate(url);
          }}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
          onMouseLeave={() => onMouseLeave && onMouseLeave()}
          className="nav_menu_button"
        >
          {false && (
            <>
              <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
              <Bildeavatar url={url} />
            </>
          )}
          <div
            className={
              isItalics(meta["nivå"] || null, sn)
                ? "italics nav_text"
                : "nav_text"
            }
          >
            <span className="nav_title">{tittel}</span>
            {meta.intervall && (
              <span className="nav_2ndtitle">
                {constants.interval}: {getInterval(meta.intervall)}
              </span>
            )}
            {visKode && <span className="nav_kode">{kode}</span>}
          </div>
          <ChevronRight />
        </button>
        <IconButton
          onClick={e => {
            onUpdateLayerProp(kode, "erSynlig", !erSynlig, "barn");
            e.stopPropagation();
          }}
        >
          {erSynlig ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlined style={{ color: "#aaa" }} />
          )}
        </IconButton>
      </div>
    );
  }
}

export default Kodelisteelement;
