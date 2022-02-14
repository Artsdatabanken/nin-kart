import React from "react";
import FavoriteLayerElement from "./AktiveKartlag/FavoriteLayerElement";
import MainSectionExpand from "../GjenbruksElement/MainSectionExpand";
import { List } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
const FavoriteLayers = ({ keys, koder, props }) => {
  return (
    <MainSectionExpand icon={<Favorite />} title={"Mine kartlag"}>
      <List>
        <ul className="kartlag_list">
          {keys.reverse().map(fkode => {
            const kartlag = koder[fkode];
            return (
              <FavoriteLayerElement
                kartlag={kartlag}
                key={fkode}
                props={props}
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
