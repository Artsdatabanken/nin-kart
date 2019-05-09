import { List } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { Component, default as React } from "react";
import { withRouter } from "react-router";
import Bakgrunnskartlag from "./bakgrunn/Bakgrunnskartlag";
import Tema from "./bakgrunn/Tema";
import Terreng from "./bakgrunn/Terreng";
import TemaButton from "./bakgrunn/TemaButton";
import VisFarge from "./VisFarge";

class Bakgrunnskart extends Component {
  handleUpdateLayerProp = (lag, key, value) => {
    this.props.onUpdateLayerProp(
      lag,
      `kart.format.${this.props.kart.aktivtFormat}.${key}`,
      value
    );
  };

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
        <>
          <VisFarge
            kf={kf}
            location={location}
            history={history}
            kartformat={this.props.kart.aktivtFormat}
            onUpdateLayerProp={this.props.onUpdateLayerProp}
          />
        </>
      );
    }

    return (
      <List>
        <div className="sidebar_element">
          <h3>Tema</h3>
          <TemaButton type={aktivtFormat} />
          {false && (
            <Terreng
              kode="bakgrunnskart"
              terreng={this.props.terreng}
              onUpdateLayerProp={this.props.onUpdateLayerProp}
            />
          )}
        </div>
        <div className="sidebar_element">
          <h3>Områder</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="vann"
            tittel="Vann"
            erSynlig={kf.vann}
            farge={kf.vann_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="land"
            tittel="Land"
            erSynlig={kf.land}
            farge={kf.land_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="transport"
            tittel="Transport"
            erSynlig={kf.transport}
            farge={kf.transport_farge}
          />
        </div>
        <div className="sidebar_element">
          <h3>Etiketter</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="vann_navn"
            tittel="Vann"
            erSynlig={kf.vann_navn}
            farge={kf.vann_navn_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="sted_navn"
            tittel="Steder"
            erSynlig={kf.sted_navn}
            farge={kf.sted_navn_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="transport_navn"
            tittel="Transport"
            erSynlig={kf.transport_navn}
            farge={kf.transport_navn_farge}
          />
        </div>
        <div className="sidebar_element">
          <h3>Administrative grenser</h3>
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="landegrense"
            tittel="Riksgrense"
            erSynlig={kf.landegrense}
            farge={kf.landegrense_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="fylkesgrense"
            tittel="Fylkesgrense"
            erSynlig={kf.fylkesgrense}
            farge={kf.fylkesgrense_farge}
          />
          <Bakgrunnskartlag
            onUpdateLayerProp={this.handleUpdateLayerProp}
            lagNavn="kommunegrense"
            tittel="Kommunegrense"
            erSynlig={kf.kommunegrense}
            farge={kf.kommunegrense_farge}
          />
        </div>
      </List>
    );
  }
}

export default withRouter(withTheme()(Bakgrunnskart));
