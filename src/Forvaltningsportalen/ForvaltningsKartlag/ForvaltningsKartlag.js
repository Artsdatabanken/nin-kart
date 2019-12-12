import React from "react";
import { SettingsContext } from "SettingsContext";
import ForvaltningsEkspanderTopp from "./ForvaltningsEkspanderTopp";
import { List } from "@material-ui/core";

class Kartlag extends React.Component {
  state = {
    showKartlag: false
  };
  render() {
    const { aktiveLag, onFitBounds, onUpdateLayerProp } = this.props;
    let koder = aktiveLag;
    const keys = Object.keys(koder);
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            <List>
              {keys.reverse().map(fkode => {
                const kartlag = koder[fkode];
                return (
                  <ForvaltningsEkspanderTopp
                    kartlag={kartlag}
                    key={fkode}
                    {...this.props}
                    visKoder={context.visKoder}
                    onFitBounds={onFitBounds}
                    onUpdateLayerProp={onUpdateLayerProp}
                  />
                );
              })}
            </List>
          </>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default Kartlag;
