import React from "react";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import MainSectionExpand from "../GjenbruksElement/MainSectionExpand";
import { List } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
const FavoriteLayers = ({ visKoder, keys, koder, props }) => {
  return (
    <MainSectionExpand icon={<Favorite />} title={"Mine kartlag"}>
      <List>
        <ul className="kartlag_list">
          {keys.reverse().map(fkode => {
            const kartlag = koder[fkode];
            return (
              <AktivtKartlagElement
                kartlag={kartlag}
                key={fkode}
                props={props}
                visKoder={visKoder}
                onFitBounds={props.onFitBounds}
                onUpdateLayerProp={props.onUpdateLayerProp}
                meta={props.meta}
              />
            );
          })}
        </ul>
      </List>
    </MainSectionExpand>
  );
};
export default FavoriteLayers;
