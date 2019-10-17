import React from "react";

const Egenskaper = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.egenskap) return null;
  return (
    <div className="taxonomy_section">
      <h3>Egenskaper</h3>
      {Object.keys(meta.egenskap.reproduksjon).map(value => {
        return (
          <div
            className="taxonomy_item"
            key={meta.egenskap.reproduksjon[value] + value}
            onClick={e => {
              onNavigate(value.url);
            }}
          >
            {meta.egenskap.reproduksjon[value] === true ? (
              <>{"Arten har " + value + " reproduksjon"} </>
            ) : (
              <>
                <span className="cap">{value}: </span>
                {meta.egenskap.reproduksjon[value]}
                {value === "generasjonstid" && " år"}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Egenskaper;
