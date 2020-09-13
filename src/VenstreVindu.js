import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Layers from "@material-ui/icons/Layers";
import AccountTree from "@material-ui/icons/AccountTree";

const useStyles = makeStyles({
  root: {
    width: 408,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 10,
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.45)",
  },
});

const NinBottomNavigation = ({ aktivTab, onNavigateToTab }) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={aktivTab === "kartlag" ? 1 : 0}
      onChange={(event, newValue) => {
        const tabs = ["informasjon", "kartlag"];
        onNavigateToTab(tabs[newValue]);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Katalog" icon={<AccountTree />} />
      <BottomNavigationAction label="Kart" icon={<Layers />} />
    </BottomNavigation>
  );
};

export default NinBottomNavigation;
