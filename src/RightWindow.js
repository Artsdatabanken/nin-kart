import ForvaltningsKartlag from "Forvaltningsportalen/ForvaltningsKartlag/ForvaltningsKartlag";
import React, { useState } from "react";
import { AppBar, Tabs, Box, Typography, Tab } from "@material-ui/core";
import FeatureInfo from "./FeatureInfo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
const RightWindow = props => {
  const [tab, setTab] = useState(0);
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 408,
        backgroundColor: "#eee",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        zIndex: -1
      }}
    >
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          aria-label="simple tabs example"
        >
          <Tab label="Kartlag" {...props} />
          <Tab label="Punkt" {...props} />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <ForvaltningsKartlag
          show_current={props.show_current}
          hidden={true}
          handleShowCurrent={props.handleShowCurrent}
          aktiveLag={props.aktiveLag}
          meta={props.meta}
          navigation_history={props.navigation_history}
          onFitBounds={props.handleFitBounds}
          history={props.history}
          onUpdateLayerProp={props.onUpdateLayerProp}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FeatureInfo {...props}></FeatureInfo>;
      </TabPanel>
    </div>
  );
};

export default RightWindow;
