import { Component, default as React } from "react";
import BakgrunnInnstillingListeElement from "./BakgrunnInnstillingListeElement";
//import Terreng from "./Terreng";
import { List } from "@material-ui/core";

class BakgrunnInnstillinger extends Component {
  //Duplikat, men ga opp å finne bedre løsning

  render() {
    const { aktivtFormat, onUpdateLayerProp } = this.props;
    const current = aktivtFormat.aktivtFormat;
    const kf = aktivtFormat.format[current];
    const what = "kart.format." + current;
    // console.log(kf);

    return (
      <List>
        {/* 
        {false && (
          <div className="sidebar_element">
            <Terreng
              kode="bakgrunnskart"
              terreng={this.props.terreng}
              onUpdateLayerProp={onUpdateLayerProp}
            />
          </div>
        )}
        */}

        <div className="sidebar_element">
          <h3>Områder</h3>

          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".vann"}
            tittel="Vann"
            erSynlig={kf.vann}
            farge={kf.vann_farge}
          />

          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".land"}
            tittel="Land"
            erSynlig={kf.land}
            farge={kf.land_farge}
          />

          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".transport"}
            tittel="Transport"
            erSynlig={kf.transport}
            farge={kf.transport_farge}
          />
        </div>

        <div className="sidebar_element">
          <h3>Administrative grenser</h3>
          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".landegrense"}
            tittel="Riksgrense"
            erSynlig={kf.landegrense}
            farge={kf.landegrense_farge}
          />
          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".fylkesgrense"}
            tittel="Fylkesgrense"
            erSynlig={kf.fylkesgrense}
            farge={kf.fylkesgrense_farge}
          />
          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".kommunegrense"}
            tittel="Kommunegrense"
            erSynlig={kf.kommunegrense}
            farge={kf.kommunegrense_farge}
          />
        </div>

        <div className="sidebar_element">
          <h3>Etiketter</h3>
          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".vann_navn"}
            tittel="Vann"
            erSynlig={kf.vann_navn}
            farge={kf.vann_navn_farge}
            omriss={kf.vann_navn_stroke_farge}
          />

          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".sted_navn"}
            tittel="Steder"
            erSynlig={kf.sted_navn}
            farge={kf.sted_navn_farge}
            omriss={kf.sted_navn_stroke_farge}
            stroke={kf.sted_navn_stroke_width}
          />

          <BakgrunnInnstillingListeElement
            onUpdateLayerProp={onUpdateLayerProp}
            oppdaterElement={what + ".transport_navn"}
            tittel="Transport"
            erSynlig={kf.transport_navn}
            farge={kf.transport_navn_farge}
            omriss={kf.transport_navn_stroke_farge}
          />
        </div>
      </List>
    );
  }
}

export default BakgrunnInnstillinger;
