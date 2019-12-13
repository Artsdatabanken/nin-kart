import LocationSearching from "@material-ui/icons/LocationSearching";
import React from "react";
import { withRouter } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import Landskap from "./Landskap";
import Vassdrag from "./Vassdrag";
import Arealtype from "./Arealtype";
import Laksefjord from "./Laksefjord";
import Losmasse from "./Løsmasse";
import Naturtype from "./Naturtype";
import Livsmiljo from "./Livsmiljø";
import Bioklimatisk from "./Bioklimatisk";
import Kalk from "./Kalk";

const FeatureInfo = ({
  meta,
  onUpdateLayerProp,
  lat,
  lng,
  sted,
  kommune,
  arealtype,
  landskap,
  naturtype,
  livsmiljø,
  vassdrag,
  seksjon,
  sone,
  kalk,
  laksefjord,
  løsmasse
}) => {
  const coords = `${Math.round(lat * 10000) / 10000}° N ${Math.round(
    lng * 10000
  ) / 10000}° Ø`;
  const kommunestr =
    kommune &&
    kommune.kommune.tittel.nb + " kommune i " + kommune.fylke.tittel.nb;
  return (
    <div>
      <List>
        <ListSubheader disableSticky={true}>
          {lat ? coords : "Klikk i kartet..."}
        </ListSubheader>
        {lat && (
          <ListItem button>
            <ListItemIcon>
              <LocationSearching />
            </ListItemIcon>
            <ListItemText primary={sted && sted.navn} secondary={kommunestr} />
          </ListItem>
        )}
        <Landskap {...landskap} onUpdateLayerProp={onUpdateLayerProp} />
        <Naturtype
          {...naturtype}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Livsmiljo
          kode="FP-NL"
          {...livsmiljø}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Vassdrag
          kode="FP-NV"
          {...vassdrag}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Arealtype
          kode="FP-NH"
          {...arealtype}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Laksefjord
          {...laksefjord}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Losmasse
          {...løsmasse}
          onUpdateLayerProp={onUpdateLayerProp}
          barn={meta.barn}
        />
        <Bioklimatisk
          barn={meta.barn}
          {...seksjon}
          onUpdateLayerProp={onUpdateLayerProp}
          tittel="Bioklimatisk seksjon"
        />
        <Bioklimatisk
          barn={meta.barn}
          {...sone}
          onUpdateLayerProp={onUpdateLayerProp}
          tittel="Bioklimatisk sone"
        />
        {false && (
          <Kalk
            {...kalk}
            onUpdateLayerProp={onUpdateLayerProp}
            barn={meta.barn}
            tittel="Kalkinnhold"
          />
        )}
      </List>
    </div>
  );
};

export default withRouter(FeatureInfo);
