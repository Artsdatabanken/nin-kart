import React from "react";

function rl_item(level) {
  return (
    <ul className="risiko_kategori">
      <hr />
      <li className={level === "RE" ? "activ RE" : "RE"}>
        <b>RE</b> <span>Regionalt utdødd</span>
      </li>
      <li className={level === "CR" ? "activ CR" : "CR"}>
        <b>CR</b> <span>Kritisk truet</span>
      </li>
      <li className={level === "EN" ? "activ EN" : "EN"}>
        <b>EN</b> <span>Sterkt truet</span>
      </li>
      <li className={level === "VU" ? "activ VU" : "VU"}>
        <b>VU</b> <span>Sårbar</span>
      </li>
      <li className={level === "NT" ? "activ NT" : "NT"}>
        <b>NT</b> <span>Nær truet</span>
      </li>
      <li className={level === "DD" ? "activ DD" : "D"}>
        <b>DD</b> <span>Datamangel</span>
      </li>
      <li className={level === "LC" ? "activ LC" : "LC"}>
        <b>LC</b> <span>Livskraftig</span>
      </li>
      <li className={level === "NA" ? "activ NA" : "NA"}>
        <b>NA</b> <span>Ikke egnet</span>
      </li>
      <li className={level === "NE" ? "activ NE" : "NE"}>
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
              {/*Object.keys(items)
                .reverse()
                .map(item => {
                  let value = items[item];
                  if (
                    item === "Kriteriedokumentasjon" ||
                    item === "Kulturmark" ||
                    item === "Kategori" ||
                    item === "AndelNåværendeBestand" ||
                    item === "AndelAvGlobalBestand" ||
                    item === "AndelAvEuropeiskBestand"
                  ) {
                    return (
                      <p>
                        <b>{item}:</b> {value}
                      </p>
                    );
                  } else {
                    return null;
                  }
                })*/}

              {items.kategori && (
                <>
                  <h3>{items.år}</h3>
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
