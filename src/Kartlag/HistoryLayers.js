import React from "react";

import HistorikkListeElement from "./Historikk/HistorikkListeElement";
import { History } from "@material-ui/icons";
import { List } from "@material-ui/core";
const HistoryLayers = ({ keys, props }) => {
  let navigation_history = props.navigation_history;
  if (navigation_history.length > 11) {
    /* History length limitation. When surpassing this limit, it removes the earliest entry */
    navigation_history.shift();
  }
  return (
    <>
      {Object.keys(navigation_history).length > 1 && (
        <div className="section">
          <h3 className="kartlag_header">
            <History />
            Historikk
          </h3>
          <List>
            {Object.keys(navigation_history)
              .reverse()
              .map((item, index) => {
                const node = navigation_history[item];
                if (
                  props.currentKartlag &&
                  (node === props.currentKartlag ||
                    node.meta.kode === props.currentKartlag.kode)
                )
                  return "";
                if (node.meta.url) {
                  return (
                    <HistorikkListeElement
                      meta={node.meta}
                      activateLayerFromHistory={props.activateLayerFromHistory}
                      node={node}
                      history={props.history}
                      key={index + node.meta.kode}
                    />
                  );
                }
                return null;
              })}
          </List>
        </div>
      )}
    </>
  );
};
export default HistoryLayers;
