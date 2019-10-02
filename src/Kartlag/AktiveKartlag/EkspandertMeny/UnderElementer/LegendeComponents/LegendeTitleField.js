import språk from "Funksjoner/språk";
import React from "react";

class LegendeTitleField extends React.Component {
  render() {
    const { tittel, undertittel } = this.props;
    return (
      <div className="title_and_subtitle_container">
        <h4>{språk(tittel) === "undefined" ? tittel.sn : språk(tittel)}</h4>
        <h5>{språk(undertittel)}</h5>
      </div>
    );
  }
}

export default LegendeTitleField;
