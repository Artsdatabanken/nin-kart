import ForvaltningsKartlag from "Forvaltningsportalen/ForvaltningsKartlag/ForvaltningsKartlag";
import React, { useState } from "react";
import { AppBar, Tabs, Typography, Tab } from "@material-ui/core";
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
      {value === index && <>{children}</>}
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
          variant="fullWidth"
          value={tab}
          onChange={(e, v) => setTab(v)}
          aria-label="simple tabs example"
        >
          <Tab label="Kartlag" />
          <Tab label="Markør" />
        </Tabs>
      </AppBar>
      <TabPanel
        value={tab}
        index={0}
        style={{
          position: "absolute",
          top: 56,
          bottom: 0,
          overflowY: "auto",
          paddingBottom: 48
        }}
      >
        <ForvaltningsKartlag
          lag={props.meta.lag}
          show_current={props.show_current}
          handleShowCurrent={props.handleShowCurrent}
          aktiveLag={props.aktiveLag}
          meta={props.meta}
          navigation_history={props.navigation_history}
          onFitBounds={props.handleFitBounds}
          history={props.history}
          onUpdateLayerProp={props.onUpdateLayerProp}
        />
      </TabPanel>
      <TabPanel
        value={tab}
        index={1}
        style={{
          position: "absolute",
          top: 56,
          bottom: 0,
          overflowY: "auto",
          paddingBottom: 48
        }}
      >
        <FeatureInfo {...props}></FeatureInfo>
      </TabPanel>
    </div>
  );
};

export default RightWindow;
