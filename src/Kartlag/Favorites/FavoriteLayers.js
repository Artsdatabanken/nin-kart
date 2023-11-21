import React from "react";
import FavoriteLayerElement from "./FavoriteLayerElement";
import MainSectionExpand from "../../GjenbruksElement/MainSectionExpand";
import { Favorite } from "@material-ui/icons";
const FavoriteLayers = ({ keys, koder, props }) => {
  return (
    <MainSectionExpand icon={<Favorite />} title={"Mine kartlag"}>
      <ul className="kartlag_list favorites">
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
              onToggleLayer={() => {
                props.removeFaveLayer(fkode);
              }}
            />
          );
        })}
      </ul>
    </MainSectionExpand>
  );
};
export default FavoriteLayers;
