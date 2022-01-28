import React from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import config from "../Funksjoner/config";
import { InfoOutlined } from "@material-ui/icons";

const Overskrift = ({ tittel, image, subtekst, onClickInfo }) => {
  return (
    <>
      <div>
        <h3 className="kartlag_header">
          <img
            src={config.logo(image)}
            style={{ position: "relative", top: 4, marginRight: 8 }}
            alt=""
          />
          {tittel}
          {onClickInfo && (
            <Tooltip
              title="Detaljer om kartlegging"
              aria-label="Detaljer om kartlegging"
            >
              <IconButton style={{}} onClick={onClickInfo}>
                <InfoOutlined style={{ color: "#777" }} />
              </IconButton>
            </Tooltip>
          )}
        </h3>
      </div>
      {false && (
        <Typography variant="body1" className="cardsubtext">
          {subtekst}
        </Typography>
      )}
    </>
  );
};

export default Overskrift;
