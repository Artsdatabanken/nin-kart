import React from "react";

const Risikovurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.risikovurdering && !meta.lenke) return null;

  return (
    <div className="taxonomy_section">
      <h3>Risikovurdering</h3>

      {meta.lenke && meta.lenke.fab && (
        <>
          Fremmedartsbase:
          <br />
          <a href={meta.lenke.fab} target="_blank" rel="noopener noreferrer">
            {meta.lenke.fab.substring(0, 32) + "..."}
          </a>
        </>
      )}
      {meta.risikovurdering && (
        <>
          {meta.risikovurdering.risikonivå.nå && (
            <span>
              Risikonivå: {meta.risikovurdering.risikonivå.nå}
              <br />
            </span>
          )}

          {meta.risikovurdering.naturtyper && (
            <>
              <h3>Naturtyper nevnt i forbindelse med risikovurderinger</h3>
              {meta.risikovurdering.naturtyper.map(value => {
                return <div key={value}>{value}</div>;
              })}
            </>
          )}

          {meta.risikovurdering.arter && (
            <>
              <h3>Arter nevnt i forbindelse med risikovurderinger</h3>
              {meta.risikovurdering.arter.map(value => {
                return <div key={value}>{value}</div>;
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Risikovurdering;
