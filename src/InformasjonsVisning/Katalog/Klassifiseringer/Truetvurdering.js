import React from "react";

const Truetvurdering = ({ meta, onNavigate }) => {
  if (!meta) return null;
  if (!meta.url.includes("Biota")) return null;
  if (!meta.truetvurdering) return null;
  console.log(meta.truetvurdering);
  let rl_norge = meta.truetvurdering.norge;
  return (
    <div className="taxonomy_section">
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
                  if (value === "Sikker") {
                    return null;
                  }
                  if (item === "år") {
                    return null;
                  }
                  if (item.length <= 1) {
                    return null;
                  }
                  return (
                    <p>
                      <b>{item}:</b> {value}
                    </p>
                  );
                })}
            </>
          );
        })}
    </div>
  );
};
export default Truetvurdering;
