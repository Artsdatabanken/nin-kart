import språk from "../../språk";
import React, { Component } from "react";
import tinycolor from "tinycolor2";
import { ListItem, ListItemText } from "@material-ui/core";
import { SettingsContext } from "../../SettingsContext";

const gaugeHeight = 7;

function contrastingColor(color) {
  const luminance = new tinycolor(color).getLuminance();
  return luminance > 0.5 ? "rgba(0,0,0,0.57)" : "rgba(255,255,255,0.57)";
}

function farge(erPå, col) {
  if (erPå) return col;
  return tinycolor.mix(col, new tinycolor("#eee"), 90).toHexString();
}

export default class LinearGauge extends Component {
  render() {
    const { tittel, trinn, onNavigate, url } = this.props;
    const antall = trinn.length;
    let påFra = 99,
      påTil = -1;
    for (let i = 0; i < antall; i++) {
      const t = trinn[i];
      t.min = (100 / antall) * i;
      t.max = (100 / antall) * (i + 1);
      if (t.på && påTil < i) påTil = i;
      if (t.på && påFra > i) påFra = i;
    }
    const påRange = [trinn[påFra], trinn[påTil]];
    console.log(påRange);
    return (
      <ListItem button dense onClick={() => onNavigate(url)}>
        <ListItemText
          primary={tittel}
          secondary={
            <React.Fragment>
              <Gauge trinn={trinn} range={påRange} />
              <div style={{ display: "flex", position: "relative", top: -10 }}>
                <div
                  style={{
                    width: "50%",
                    textAlign: "center"
                  }}
                >
                  {språk(påRange[0].tittel)}
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                  {språk(påRange[1].tittel)}
                </div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }
}

const Gauge = ({ trinn, range }) => {
  return (
    <svg viewBox="-2 -1 104 13">
      <defs>
        <filter id="f1" x="-2" y="0" width="104" height="10">
          <feOffset result="offOut" in="SourceGraphic" dx="0.051" dy="0.051" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <filter id="f2" x="0" y="0" width="102" height="10">
          <feGaussianBlur
            result="blurOut"
            in="SourceGraphic"
            stdDeviation="0.5"
          />
          <feOffset in="blurOut" dx="0.4" dy="0.4" result="DROPSHADOW" />
        </filter>
      </defs>
      <rect
        x={0}
        y={0}
        width={100}
        height={gaugeHeight}
        fill="#888"
        filter="url(#f1)"
        stroke="rgba(0,0,0,0.67)"
        strokeWidth={0.25}
      />
      {trinn.map(e => {
        const color = farge(e.på, e.farge);
        return (
          <React.Fragment key={e.min}>
            {!e.på && (
              <rect
                x={e.min}
                width={e.max - e.min}
                y={0}
                height={gaugeHeight}
                fill={color}
                filter={e.på && false ? "url(#f2)" : ""}
                stroke="none"
              >
                <title>{e.tittel.nb}</title>
              </rect>
            )}
          </React.Fragment>
        );
      })}
      {range &&
        [range].map(([min, max]) => (
          <React.Fragment>
            <Shadow
              key={min}
              x1={min.min}
              y1={0}
              x2={max.max}
              y2={gaugeHeight}
              color1="rgba(128,128,128,0.9)"
            />
            <Etikett x1={0.5 * (min.min + min.max)} x2={25} />
            {min !== max && <Etikett x1={0.5 * (max.min + max.max)} x2={75} />}
            {false && (
              <path
                d={`M${0.5 * (min.min + min.max)} ${gaugeHeight} C ${
                  min.min
                } ${gaugeHeight + 5}, 18 ${gaugeHeight}, 18 ${gaugeHeight + 4}`}
                stroke="rgba(0,0,0,0.37)"
                strokeWidth={0.5}
                fill="transparent"
              />
            )}
            {false && (
              <text
                x={0}
                y={gaugeHeight + 4}
                fontSize={3.8}
                fontWeight="500"
                fill="rgba(0,0,0,0.37)"
                dominantBaseline="hanging"
                textAnchor="start"
              >
                {språk(min.tittel)}
              </text>
            )}
          </React.Fragment>
        ))}

      {trinn.map(e => {
        const color = farge(e.på, e.farge);
        return (
          <React.Fragment key={e.min}>
            {e.på && (
              <rect
                x={e.min}
                width={e.max - e.min}
                y={0}
                height={gaugeHeight}
                rx={0}
                fill={color}
                stroke="none"
              >
                <title>{e.tittel.nb}</title>
              </rect>
            )}
            <SettingsContext.Consumer>
              {context =>
                context.visKoder && (
                  <text
                    x={0.5 * (e.min + e.max)}
                    y={0.53 * gaugeHeight}
                    fontSize={3.8}
                    fontWeight="500"
                    fill={contrastingColor(color)}
                    dominantBaseline="middle"
                    textAnchor="middle"
                  >
                    {e.kode[e.kode.length - 1].toLowerCase()}
                  </text>
                )
              }
            </SettingsContext.Consumer>
            ;
            {e.max < 100 && (
              <line
                x1={e.max}
                x2={e.max}
                y1={0}
                y2={gaugeHeight}
                strokeWidth="0.5"
                stroke="rgba(0,0,0,0.37)"
              />
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

const Etikett = ({ x1, x2 }) => (
  <path
    d={`M${x1} ${gaugeHeight} C ${x1} ${gaugeHeight +
      5}, ${x2} ${gaugeHeight}, ${x2} ${gaugeHeight + 4}`}
    stroke="rgba(0,0,0,0.37)"
    strokeWidth={0.5}
    fill="transparent"
  />
);

const Shadow = ({ x1, x2, y1, y2, color1, color2 }) => {
  return (
    <g>
      <rect
        x={x1}
        y={y1}
        width={x2 - x1}
        height={y2 - y1}
        stroke={color1}
        fill="rgba(0,0,0,0.8)"
        strokeWidth="0"
        filter={"url(#f2)"}
      />
    </g>
  );
};
