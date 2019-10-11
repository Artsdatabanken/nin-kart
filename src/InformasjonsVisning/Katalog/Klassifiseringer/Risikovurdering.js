import React from "react";

const Risikovurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.risikovurdering) return null;
  let risikovurdering = meta.risikovurdering;
  return (
    <div className="taxonomy_section">
      <h3>Risikovurdering</h3>

      <ul className="risiko_kategori">
        <li className="SE">
          <b>SE</b> <span>Svært høy risiko</span>
        </li>
        <li className="HI">
          <b>HI</b> <span>Høy risiko</span>
        </li>
        <li className="PH">
          <b>PH</b> <span>Potensielt høy risiko</span>
        </li>
        <li className="LO">
          <b>LO</b> <span>Lav risiko</span>
        </li>
        <li className="NK">
          <b>NK</b> <span>Ingen kjent risiko</span>
        </li>
        <li className="NR">
          <b>NR</b> <span>Ikke risikovurdert</span>
        </li>
      </ul>

      {meta.risikovurdering.risikonivå.nå && (
        <span>
          Risikonivå: {meta.risikovurdering.risikonivå.nå}
          <br />
        </span>
      )}

      {risikovurdering.naturtyper && (
        <>
          <h3>Naturtyper nevnt i forbindelse med risikovurderinger</h3>
          {risikovurdering.naturtyper.map(value => {
            return <div key={value}>{value}</div>;
          })}
        </>
      )}

      {risikovurdering.arter && (
        <>
          <h3>Arter nevnt i forbindelse med risikovurderinger</h3>
          {risikovurdering.arter.map(value => {
            return <div key={value}>{value}</div>;
          })}
        </>
      )}
    </div>
  );
};
export default Risikovurdering;
