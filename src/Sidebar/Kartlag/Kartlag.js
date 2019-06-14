import React from "react";
import { SettingsContext } from "SettingsContext";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";

class Kartlag extends React.Component {
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    const {
      onFitBounds,
      onUpdateLayerProp,
      hidden,
      history,
      navigation_history,
      activateLayerFromHistory,
      currentKartlag,
      meta,
      show_current,
      handleShowCurrent
    } = this.props;

    // Bah. Denne sjekker om aktivt lag er i kartlag, men oppdaterer ikke på klikk
    if (currentKartlag && currentKartlag.kode) {
      for (let item in keys) {
        // console.log("it is contained");
      }
    }

    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <div className="kartlag sidebar">
                <div className="sidebar_element page_topic_header" />
                <div className="sidebar_title_container sidebar_element">
                  <h1 className="sidebar_title">Kartlag</h1>
                </div>
                {true && (
                  <div className="sidebar_element">
                    <h2>Nåværende kartlag</h2>
                    <h3>legg inn sjekk her for om den er i aktivt kartlag</h3>
                    <ul className="kartlag_list">
                      <AktivtKartlagElement
                        kartlag={currentKartlag}
                        {...this.props}
                        visKoder={context.visKoder}
                        erAktivtLag={true}
                        show_current={show_current}
                        handleShowCurrent={handleShowCurrent}
                      />
                    </ul>
                  </div>
                )}

                <div className="sidebar_element">
                  <h2>Innstillinger</h2>

                  <ul className="kartlag_list">
                    <AktivtKartlagElement
                      kartlag={koder["bakgrunnskart"]}
                      {...this.props}
                      visKoder={context.visKoder}
                    />
                  </ul>
                </div>

                <div className="sidebar_element">
                  <h2>Mine Kartlag</h2>
                  <ul className="kartlag_list">
                    {keys.map(fkode => {
                      const kartlag = koder[fkode];
                      return (
                        fkode !== "bakgrunnskart" && (
                          <AktivtKartlagElement
                            kartlag={kartlag}
                            key={fkode}
                            {...this.props}
                            visKoder={context.visKoder}
                            onFitBounds={onFitBounds}
                            onUpdateLayerProp={onUpdateLayerProp}
                            meta={meta}
                          />
                        )
                      );
                    })}
                  </ul>
                </div>

                <div className="sidebar_element">
                  <h2>Historikk</h2>

                  {Object.keys(navigation_history).map(item => {
                    const node = navigation_history[item];
                    if (node.meta.url && node !== currentKartlag) {
                      return (
                        <HistorikkListeElement
                          meta={node.meta}
                          activateLayerFromHistory={activateLayerFromHistory}
                          node={node}
                          history={history}
                        />
                      );
                    }
                    return <></>;
                  })}
                </div>
              </div>
            )}
          </SettingsContext.Consumer>
        )}
      </>
    );
  }
}

export default Kartlag;
