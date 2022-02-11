import React from "react";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import { List, Tooltip } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
const FavoriteLayers = ({ visKoder, keys, koder, props }) => {
  return (
    <div className="section">
      <Tooltip
        title="Disse kartlagene vises alltid i kartet"
        aria-label="Disse kartlagene vises alltid i kartet"
      >
        <h3 className="kartlag_header">
          <Favorite />
          Mine kartlag
        </h3>
      </Tooltip>
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
    </div>
  );
};
export default FavoriteLayers;
