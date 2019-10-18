import React from "react";

function rl_item(level) {
  return (
    <ul className="risiko_kategori">
      <li className={level === "RE" ? "activ RE" : "RE"}>
        <hr />
        <b>RE</b> <span>Regionalt utdødd</span>
      </li>
      <li className={level === "CR" ? "activ CR" : "CR"}>
        <hr />
        <b>CR</b> <span>Kritisk truet</span>
      </li>
      <li className={level === "EN" ? "activ EN" : "EN"}>
        <hr />
        <b>EN</b> <span>Sterkt truet</span>
      </li>
      <li className={level === "VU" ? "activ VU" : "VU"}>
        <hr />
        <b>VU</b> <span>Sårbar</span>
      </li>
      <li className={level === "NT" ? "activ NT" : "NT"}>
        <hr />
        <b>NT</b> <span>Nær truet</span>
      </li>
      <li className={level === "DD" ? "activ DD" : "D"}>
        <hr />
        <b>DD</b> <span>Datamangel</span>
      </li>
      <li className={level === "LC" ? "activ LC" : "LC"}>
        <hr />
        <b>LC</b> <span>Livskraftig</span>
      </li>
      <li className={level === "NA" ? "activ NA" : "NA"}>
        <hr />
        <b>NA</b> <span>Ikke egnet</span>
      </li>
      <li className={level === "NE" ? "activ NE" : "NE"}>
        <hr />
        <b>NE</b> <span>Ikke vurdert</span>
      </li>
    </ul>
  );
}

const Truetvurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.truetvurdering) return null;
  if (!meta.truetvurdering.norge) return null;
  let rl_norge = meta.truetvurdering.norge;

  return (
    <div className="species_sections">
      <h3>Rødlistevurdering</h3>

      {Object.keys(rl_norge)
        .reverse()
        .map(nummer => {
          let items = rl_norge[nummer];

          return (
            <>
              {items.kategori && (
                <>
                  <h3 key={nummer}>{items.år}</h3>
                  {rl_item(items.kategori)}
                </>
              )}
            </>
          );
        })}
    </div>
  );
};
export default Truetvurdering;
