import React from "react";
import "style/Forvaltningsportalen.scss";
import ForvaltningsKartlag from "Forvaltningsportalen/ForvaltningsKartlag/ForvaltningsKartlag";

const Forvaltningsportalen = props => {
  const {
    history,
    aktiveLag,
    show_current,
    handleShowCurrent,
    navigation_history,
    handleFitBounds,
    onUpdateLayerProp,
    meta
  } = props;
  return (
    <>
      <div style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}>
        <>
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
      </div>
    </>
  );
};

export default Forvaltningsportalen;
