import React, { useEffect, useRef, useState } from "react";

const ADBHeader = ({}) => {
  return (
    <div className={"top_bar adb-topbar "}>
      <div className="nin-topbar">
        <div className="header_text">
          <img
            src="https://artsdatabanken.no/Files/20978"
            className="logo-icon smallscreen"
            alt="artsdatabanken-logo"
          />
          <img
            src="https://artsdatabanken.no/Files/20973"
            className="logo-icon bigscreen"
            alt="artsdatabanken-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ADBHeader;
