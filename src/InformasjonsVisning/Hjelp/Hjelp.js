import React from "react";
import WikiMarkdown from "../../GjenbruksElement/WikiMarkdown";

const Hjelp = ({ aktivTab }) => (
  <>
    <div
      className={
        (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") + " main_body"
      }
    >
      <WikiMarkdown sidenavn="Bruk" />
    </div>
  </>
);

export default Hjelp;
