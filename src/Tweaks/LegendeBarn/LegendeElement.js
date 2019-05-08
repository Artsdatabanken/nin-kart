import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router";
import LegendeColourAvatar from "./LegendeComponents/LegendeColourAvatar";
import LegendeTitleField from "./LegendeComponents/LegendeTitleField";

class LegendeElement extends React.Component {
  render() {
    const {
      tittel,
      undertittel,
      kode,
      farge,
      onMouseLeave,
      onMouseEnter,
      onClick,
      erSynlig
    } = this.props;
    return (
      <div className="child_list_object">
        <button
          className="grouped_items_button"
          onClick={() => onClick(kode)}
          key={kode}
          onMouseEnter={() => onMouseEnter({ kode })}
          onMouseLeave={() => {
            onMouseLeave();
          }}
        >
          <LegendeTitleField tittel={tittel} undertittel={undertittel} />
          <LegendeColourAvatar farge={farge} kode={kode} />
        </button>

        <button
          className="invisible_icon_button show_hide_button"
          onClick={e => {
            this.props.onUpdateLayerProp(
              kode,
              "erSynlig",
              !this.props.erSynlig
            );
            e.stopPropagation();
          }}
        >
          {this.props.erSynlig ? (
            <VisibilityOutlined />
          ) : (
            <VisibilityOffOutlined style={{ color: "#aaa" }} />
          )}
        </button>
      </div>
    );
  }
}

export default withRouter(LegendeElement);
