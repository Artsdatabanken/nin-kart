import React from "react";
import språk from "../../Funksjoner/språk";
import { ListItem, ListItemText } from "@material-ui/core";

const HistorikkListeElement = ({ meta, history }) => {
  if (!meta) return;

  return (
    <ListItem button onClick={() => history.push(meta.url)}>
      <ListItemText primary={språk(meta.tittel)}></ListItemText>
    </ListItem>
  );

  /*
  <div className="kartlag_list_title">
        <div className="kartlag_header">
          <span className="kartlag_list_title">
            {språk(meta.tittel) === "undefined"
              ? meta.tittel.sn
              : språk(meta.tittel)}
          </span>
          <span className="kartlag_list_icon_set">
            {false && <button
              className="invisible_icon_button add_icon"
              title={"Legg til kartlag " + språk(meta.tittel)}
              onClick={event => {
                activateLayerFromHistory(node);
              }}
            >
              <Add />
            </button>}
  
            <button
              className="invisible_icon_button "
              title={"Vis informasjonsside"}
            >
              <KeyboardArrowRight onClick={() => history.push(meta.url)} />
            </button>
          </span>
        </div>
      </div>
    );*/
};

export default HistorikkListeElement;
