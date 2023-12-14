import React from "react";
import TopBar from "./TopBar";
import GlobalHeader from "./GlobalHeader";

const Headers = ({ searchFor, onToggleHovedMeny, onSelectResult, history }) => {
  return (
    <div className="adb-dropdown-wrap">
      <GlobalHeader/>
      <TopBar
        searchFor={searchFor}
        onToggleHovedMeny={onToggleHovedMeny}
        onSelectResult={onSelectResult}
        history={history}
      />
    </div>
  );
};

export default Headers;
