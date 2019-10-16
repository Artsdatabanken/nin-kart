import React from "react";

function rl_item(kategori) {
  return (
    <div class="categorybar">
      Kategori: {kategori}
      <br />
      <div>
        <p>RE</p>
      </div>
      <div>
        <p>CR</p>
      </div>
      <div>
        <p>EN</p>
      </div>
      <div>
        <p>VU</p>
      </div>
      <div>
        <p>NT</p>
      </div>
      <div>
        <p>DD</p>
      </div>
      <div>
        <p>LC</p>
      </div>
    </div>
  );
}

const Truetvurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.truetvurdering) return null;
  if (!meta.truetvurdering.norge) return null;
  console.log(meta.truetvurdering.norge);
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
              <h3>{items.år}</h3>

              {Object.keys(items)
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
                  }
                })}

              {items.kategori && rl_item(items.kategori)}
            </>
          );
        })}
    </div>
  );
};
export default Truetvurdering;
