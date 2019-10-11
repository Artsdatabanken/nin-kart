import React from "react";
import språk from "Funksjoner/språk";

const Taksonomi = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  let { overordnet } = meta;
  return (
    <>
      {overordnet.map(value => {
        return (
          <div
            onClick={e => {
              onNavigate(value.url);
            }}
          >
            {value.nivå}:{" "}
            <span
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
          </div>
        );
      })}
    </>
  );
};
export default Taksonomi;
