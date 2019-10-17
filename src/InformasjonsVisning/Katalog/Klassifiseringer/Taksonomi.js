import React from "react";
import språk from "Funksjoner/språk";

const Taksonomi = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  let overordnet = meta.overordnet.slice(0, 8).reverse();
  return (
    <div className="taxonomy_section">
      <h3>Taksonomi</h3>
      {overordnet.map(value => {
        return (
          <button
            className="taxonomy_item"
            key={value.kode}
            onClick={e => {
              console.log("ffs");
              onNavigate(value.url);
            }}
          >
            {value.nivå}:{" "}
            <span
              className="specieslink"
              style={{
                fontStyle:
                  (value.nivå === "Slekt" ||
                    value.nivå === "Art" ||
                    value.nivå === "Underart" ||
                    value.nivå === "Varietet") &&
                  "italic"
              }}
            >
              {språk(value.tittel)} ({value.kode})
            </span>
          </button>
        );
      })}
    </div>
  );
};
export default Taksonomi;
