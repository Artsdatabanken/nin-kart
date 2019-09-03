import React from "react";
import språk from "Funksjoner/språk";
import { Add, KeyboardArrowRight } from "@material-ui/icons";

const HistorikkListeElement = ({
  meta,
  history,
  activateLayerFromHistory,
  node
}) => {
  return (
    <div className="kartlag_list_title">
      <div className="kartlag_header">
        <span className="kartlag_list_title">{språk(meta.tittel)}</span>
        <span className="kartlag_list_icon_set">
          <button
            className="invisible_icon_button add_icon"
            onClick={event => {
              activateLayerFromHistory(node);
            }}
          >
            <Add />
          </button>

          <button className="invisible_icon_button ">
            <KeyboardArrowRight onClick={() => history.push("/" + meta.url)} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default HistorikkListeElement;
