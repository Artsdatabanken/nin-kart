import React from "react";

const Truetvurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.truetvurdering) return null;

  let vurdering = "LC";

  return (
    <div className="taxonomy_section">
      <h3>Rødlistevurdering</h3>
      Artens hovedhabitat er {meta.truetvurdering.Hovedhabitat}.
      <br />
      Den norske bestanden utgjør {meta.truetvurdering.AndelAvGlobalBestand} av
      den totale forekomsten, og {meta.truetvurdering.AndelAvEuropeiskBestand}{" "}
      av den europeiske bestanden.
      {meta.truetvurdering["Påvirkningsfaktorer"] && (
        <p>
          <h4>Påvirkningsfaktorer</h4>
          {meta.truetvurdering["Påvirkningsfaktorer"]}
        </p>
      )}
    </div>
  );
};
export default Truetvurdering;
