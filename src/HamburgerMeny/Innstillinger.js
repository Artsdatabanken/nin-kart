import Menyelement from "./Menyelement";
import { ListSubheader, Typography } from "@material-ui/core";
import { SortByAlpha } from "@material-ui/icons";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const Innstillinger = ({
  visKoder,
  sorterPåKode,
  onUpdateSetting,
  spraak,
  handleSpraak
}) => (
  <>
    <ListSubheader>Innstillinger</ListSubheader>

    <Menyelement
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateSetting("visKoder", !visKoder);
      }}
      icon={
        <Typography>
          <span>NA</span>
        </Typography>
      }
      primary="Vis koder i tillegg til navn"
      toggle
      checked={visKoder}
    />
    <Menyelement
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onUpdateSetting("sorterPåKode", !sorterPåKode);
      }}
      icon={<SortByAlpha />}
      primary="Sorter lister etter"
      secondary={sorterPåKode ? " Koder" : " Navn"}
    />
    <DropdownButton
      alignRight
      drop={"right"}
      title={"Velg språk"}
      id={"dropdown-button-drop-right"}
      key={"right"}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown.Item
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSpraak("en");
        }}
      >
        Engelsk
      </Dropdown.Item>
      <Dropdown.Item
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSpraak("nb");
        }}
      >
        Norsk bokmål
      </Dropdown.Item>
      <Dropdown.Item
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSpraak("la");
        }}
      >
        Latin
      </Dropdown.Item>
    </DropdownButton>

    <Menyelement
      icon={
        <Typography>
          <span>Aa</span>
        </Typography>
      }
      primary="Velg språk"
    />

    <KeyboardArrowDown />
    <KeyboardArrowUp />

    <h1>{spraak}</h1>
  </>
);

export default Innstillinger;
