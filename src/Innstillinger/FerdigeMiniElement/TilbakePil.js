import { ArrowBackIos } from "@material-ui/icons/";
import React, { Component } from "react";

class TilbakePil extends Component {
  render() {
    const { url, history } = this.props;
    return (
      <div className="back_to_menu">
        {url && (
          <button
            className="invisible_icon_button"
            onClick={() => {
              history.push("/" + url);
            }}
          >
            <ArrowBackIos className="iconSmall" />
          </button>
        )}
      </div>
    );
  }
}

export default TilbakePil;
