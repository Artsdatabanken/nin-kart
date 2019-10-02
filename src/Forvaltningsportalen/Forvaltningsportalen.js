import React from "react";
import "style/Forvaltningsportalen.scss";
import ForvaltningsportalenLandingsside from "Forvaltningsportalen/ForvaltningsportalenLandingsside";
import ForvaltningsKartlag from "Forvaltningsportalen/ForvaltningsKartlag/ForvaltningsKartlag";
import ForvaltningsKartBokser from "Forvaltningsportalen/ForvaltningsKartBokser/ForvaltningsKartBokser";

const Forvaltningsportalen = props => {
  const {
    history,
    path,
    forvaltningsportalen,
    aktiveLag,
    show_current,
    handleShowCurrent,
    navigation_history,
    handleFitBounds,
    onUpdateLayerProp,
    meta
  } = props;
  console.log(path);
  return (
    <>
      {forvaltningsportalen === "true" && (
        <>
          {path !== "/forvaltningsportalen/kart" ? (
            <ForvaltningsportalenLandingsside
              history={history}
              aktiveLag={aktiveLag}
            />
          ) : (
            <>
              <ForvaltningsKartBokser history={history} />
              <ForvaltningsKartlag
                show_current={show_current}
                hidden={true}
                handleShowCurrent={handleShowCurrent}
                aktiveLag={aktiveLag}
                meta={meta}
                navigation_history={navigation_history}
                onFitBounds={handleFitBounds}
                history={history}
                onUpdateLayerProp={onUpdateLayerProp}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Forvaltningsportalen;
