import { Component, default as React } from "react";
import { withRouter } from "react-router";
import BakgrunnsElementer from "./BakgrunnsMenyer/BakgrunnsElementer";
import Google from "./BakgrunnsMenyer/Google";
import TemaButton from "./BakgrunnsMenyer/Bakgrunn/TemaButton";

class BakgrunnsInnstillinger extends Component {
  render() {
    const { history, location } = this.props;
    const { aktivtFormat } = this.props.kart;
    const kf = this.props.kart.format[aktivtFormat];

    return (
      <>
        <div className="sidebar_element">
          <h1>Bakgrunnsinnstillinger</h1>
          <h2>Rediger hvordan bakgrunnskartet fremstår</h2>
        </div>

        <div className="sidebar_element">
          <h3>Endre valgt tema for bakgrunnskart</h3>
          <TemaButton type={aktivtFormat} />
        </div>

        {aktivtFormat === "google_hybrid" ||
        aktivtFormat === "google_satellite" ? (
          <div className="sidebar_element">
            <h3>Fargefilter for Google-kartbladet</h3>
            <Google {...this.props} />
          </div>
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
