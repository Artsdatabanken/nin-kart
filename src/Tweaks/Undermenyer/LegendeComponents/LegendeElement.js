//import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router";
import VelgFargeBoks from "Tweaks/FerdigeMiniElement/VelgFargeBoks";
import LegendeTitleField from "./LegendeTitleField";

class LegendeElement extends React.Component {
  render() {
    const { tittel, undertittel, kode, farge, goToColourMenu } = this.props;
    return (
      <div className="child_list_object">
        <button
          className="grouped_items_button"
          onClick={() => goToColourMenu(kode)}
          key={kode}
        >
          <LegendeTitleField tittel={tittel} undertittel={undertittel} />
          <VelgFargeBoks farge={farge} kode={kode} />
          {}
        </button>
        {/* 
        <button
          className="invisible_icon_button show_hide_button"
          onClick={e => {
            this.props.onUpdateLayerProp(
              kode,
              "erSynlig",
              !erSynlig
            );
            e.stopPropagation();
          }}
        >
          {erSynlig ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlined style={{ color: "#aaa" }} />
          )}
        </button>
        */}
      </div>
    );
  }
}

export default withRouter(LegendeElement);
