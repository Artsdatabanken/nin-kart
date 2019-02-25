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
                {påFra !== påTil && (
                  <div style={{ width: "50%", textAlign: "center" }}>
                    {språk(påRange[1].tittel)}
                  </div>
                )}
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
    <SettingsContext.Consumer>
      {context => (
        <svg viewBox="-2 -1 104 13">
          <defs>
            <filter id="f1" x="-2" y="0" width="104" height="10">
              <feOffset result="offOut" in="SourceGraphic" dx="0.1" dy="0.1" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.4" />
            </filter>
            <filter id="f2" x="0" y="0" width="102" height="10">
              <feGaussianBlur
                result="blurOut"
                in="SourceGraphic"
                stdDeviation="0.5"
              />
              <feOffset in="blurOut" dx="0.8" dy="0.8" result="DROPSHADOW" />
              )}
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
          {range &&
            [range].map(([min, max]) => (
              <React.Fragment key={min.min}>
                <Shadow
                  key={min}
                  x1={min.min}
                  y1={0}
                  x2={max.max}
                  y2={gaugeHeight}
                  color1="rgba(128,128,128,0.9)"
                />
                <Etikett x1={0.5 * (min.min + min.max)} x2={25} />
                {min !== max && (
                  <Etikett x1={0.5 * (max.min + max.max)} x2={75} />
                )}
              </React.Fragment>
            ))}
          {trinn.map(e => {
            const colorOff = farge(false, e.farge);
            const color = farge(e.på, e.farge);
            return (
              <React.Fragment key={e.min}>
                <rect
                  x={e.min}
                  width={e.max - e.min}
                  y={0}
                  height={gaugeHeight}
                  rx={0}
                  _fill={color}
                  stroke="none"
                >
                  <title>{e.tittel.nb}</title>
                  <animate
                    attributeName="fill"
                    dur="0.5s"
                    values={`#fff; ${color}`}
                    keyTimes="0; 1"
                    fill="freeze"
                  />
                  <animate
                    attributeName="fill"
                    dur="0.2s"
                    begin="mouseover"
                    values={`${color}; ${e.farge}`}
                    keyTimes="0; 1"
                    fill="freeze"
                  />
                  <animate
                    attributeName="fill"
                    dur="0.6s"
                    begin="mouseout"
                    values={`${e.farge}; ${color}`}
                    keyTimes="0; 1"
                    fill="freeze"
                  />
                </rect>
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
                {context.visKoder && (
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
                )}
              </React.Fragment>
            );
          })}
        </svg>
      )}
    </SettingsContext.Consumer>
  );
};

const Etikett = ({ x1, x2 }) => {
  const edge = x2 < 50 ? 0 : 100;
  const start = `M${edge} ${gaugeHeight} C ${edge} ${gaugeHeight +
    5}, ${x2} ${gaugeHeight}, ${x2} ${gaugeHeight + 4}`;
  const end = `M${x1} ${gaugeHeight} C ${x1} ${gaugeHeight +
    5}, ${x2} ${gaugeHeight}, ${x2} ${gaugeHeight + 4}`;

  return (
    <path
      d={`M${x1} ${gaugeHeight} C ${x1} ${gaugeHeight +
        5}, ${x2} ${gaugeHeight}, ${x2} ${gaugeHeight + 4}`}
      stroke="rgba(0,0,0,0.37)"
      strokeWidth={0.5}
      fill="transparent"
      xlinkHref="#left"
    >
      <animate
        attributeName="d"
        dur="440ms"
        repeatCount="1"
        keyTimes="0;                       1"
        calcMode="spline"
        keySplines="0.645, 0.045, 0.355, 1"
        values={`${start};
        ${end}`}
      />
    </path>
  );
};

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
