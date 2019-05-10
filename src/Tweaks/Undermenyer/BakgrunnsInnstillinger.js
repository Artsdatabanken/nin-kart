import { Component, default as React } from "react";
import { withRouter } from "react-router";
import Tema from "./bakgrunn/Tema";
import BakgrunnsElementer from "./BakgrunnsMenyer/BakgrunnsElementer";
import VisFarge from "./BakgrunnsMenyer/VisFarge";
import Google from "./BakgrunnsMenyer/Google";
import TemaButton from "./bakgrunn/TemaButton";

class BakgrunnsInnstillinger extends Component {
  render() {
    const { history, location } = this.props;
    const { aktivtFormat } = this.props.kart;
    const kf = this.props.kart.format[aktivtFormat];

    if (location.search === "?vis_tema")
      return (
        <Tema
          onUpdateLayerProp={this.props.onUpdateLayerProp}
          valgt={aktivtFormat}
        />
      );

    if (location.search.startsWith("?vis_farge")) {
      return (
        <VisFarge
          kf={kf}
          location={location}
          history={history}
          kartformat={this.props.kart.aktivtFormat}
          onUpdateLayerProp={this.props.onUpdateLayerProp}
        />
      );
    }

    return (
      <>
        <h3>Tema</h3>
        <TemaButton type={aktivtFormat} />
        <h3>Bakgrunnsinnstillinger</h3>

        {aktivtFormat === "google_hybrid" ||
        aktivtFormat === "google_satellite" ? (
          <Google {...this.props} />
        ) : (
          <BakgrunnsElementer
            kf={kf}
            location={location}
            history={history}
            kartformat={this.props.kart.aktivtFormat}
            onUpdateLayerProp={this.props.onUpdateLayerProp}
            aktivtFormat={aktivtFormat}
          />
        )}
      </>
    );
  }
}

export default withRouter(BakgrunnsInnstillinger);
