import React from "react";
import { SettingsContext } from "SettingsContext";
import ForvaltningsEkspanderTopp from "./ForvaltningsEkspanderTopp";
import { List, ListSubheader } from "@material-ui/core";

class ForvaltningsKartlag extends React.Component {
  render() {
    const { lag, onUpdateLayerProp } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            <List>
              {Object.keys(lag || {}).map(datalev => {
                return (
                  <div key={datalev}>
                    <ListSubheader disableSticky={true}>
                      {datalev}
                    </ListSubheader>
                    <DataLevLag
                      koder={lag[datalev]}
                      onUpdateLayerProp={onUpdateLayerProp}
                      context={context}
                    ></DataLevLag>
                  </div>
                );
              })}
            </List>
          </>
        )}
      </SettingsContext.Consumer>
    );
  }
}

const DataLevLag = ({ context, koder, onUpdateLayerProp, ...props }) => {
  const keys = Object.keys(koder);

  return keys.reverse().map(fkode => {
    const kartlag = koder[fkode];
    return (
      <ForvaltningsEkspanderTopp
        kartlag={kartlag}
        key={fkode}
        {...props}
        visKoder={context.visKoder}
        onUpdateLayerProp={onUpdateLayerProp}
      />
    );
  });
};

export default ForvaltningsKartlag;
