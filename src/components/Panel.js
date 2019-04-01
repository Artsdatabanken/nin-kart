import React from "react";

const Panel = ({ children }) => (
  <div className="sidebar">
    {children}
    <div className="mobile_navigation">
      <button>Meny</button>
      <button>Kart</button>
    </div>
  </div>
);

export default Panel;
