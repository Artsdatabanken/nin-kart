import React from "react";
import WikiMarkdown from "../../GjenbruksElement/WikiMarkdown";

const Hjelp = ({ handleHelp }) => {
  return (
    <div className="leftwindow lukkbartvindu">
      <div className="" style={{ padding: 24 }}>
        <button
          onClick={() => {
            handleHelp();
          }}
        >
          {" "}
          Lukk{" "}
        </button>
        <WikiMarkdown sidenavn="Bruk" />
      </div>
    </div>
  );
};

export default Hjelp;
