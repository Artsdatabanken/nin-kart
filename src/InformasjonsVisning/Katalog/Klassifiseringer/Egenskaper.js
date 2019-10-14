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
            className="taxonomy_item cap"
            key={value.kode}
            onClick={e => {
              onNavigate(value.url);
            }}
          >
            {value}:{" "}
            {meta.egenskap.reproduksjon[value] === true
              ? "Ja"
              : meta.egenskap.reproduksjon[value]}
          </div>
        );
      })}
    </div>
  );
};
export default Egenskaper;
