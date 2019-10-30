import React from "react";

const Risikovurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.risikovurdering) return null;

  let fablink = meta.lenke["fab"];
  let fablink_shortened = fablink && fablink.substring(0, 32) + "...";
  let risikonivå = null;
  if (
    meta.risikovurdering &&
    meta.risikovurdering !== undefined &&
    meta.risikovurdering.risikovurdering
  ) {
    risikonivå = meta.risikovurdering.risikonivå;
  }

  return (
    <div className="taxonomy_section">
      <h3>Risikovurdering</h3>

      {fablink && (
        <>
          Fremmedartsbase:
          <br />
          <a href={fablink} target="_blank" rel="noopener noreferrer">
            {fablink_shortened}
          </a>
        </>
      )}

      {risikonivå && (
        <>
          {Object.keys(meta.risikovurdering.risikonivå).map(key => {
            let level = meta.risikovurdering.risikonivå[key];
            return (
              <>
                <h4>
                  Fremmedartsvurdering {key}, {level}{" "}
                </h4>
                <ul className="risiko_kategori">
                  <hr />
                  <li className={level === 5 ? "activ SE" : "SE"}>
                    <b>SE</b> <span>Svært høy risiko</span>
                  </li>
                  <li className={level === 4 ? "activ HI" : "HI"}>
                    <b>HI</b> <span>Høy risiko</span>
                  </li>
                  <li className={level === 3 ? "activ PH" : "PH"}>
                    <b>PH</b> <span>Potensielt høy risiko</span>
                  </li>
                  <li className={level === 2 ? "activ LO" : "LO"}>
                    <b>LO</b> <span>Lav risiko</span>
                  </li>
                  <li className={level === 1 ? "activ NK" : "NK"}>
                    <b>NK</b> <span>Ingen kjent risiko</span>
                  </li>
                  <li className={level === 0 ? "activ NR" : "NR"}>
                    <b>NR</b> <span>Ikke risikovurdert</span>
                  </li>
                </ul>
              </>
            );
          })}

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
