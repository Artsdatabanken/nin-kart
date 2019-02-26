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

function rutefarge(erPå, col) {
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
              <feDropShadow
                dx="0.2"
                dy="0.2"
                stdDeviation="0.1"
                floodOpacity="0.3"
              />
            </filter>
            <filter id="f2" x="0" y="0" width="102" height="10">
              <feDropShadow
                dx="0.7"
                dy="0.7"
                stdDeviation="0.4"
                floodOpacity="0.3"
              />
              )}
            </filter>
          </defs>
          <rect
            x={-0.3}
            width={100.6}
            y={-0.2}
            height={gaugeHeight + 0.4}
            fill="#ccc"
            filter="url(#f1)"
            _stroke="rgba(0,0,0,0.37)"
            strokeWidth={0.25}
          />
          {trinn.map(e => {
            return !e.på && <Rute {...e} visKoder={context.visKoder} />;
          })}

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
            return e.på && <Rute {...e} visKoder={context.visKoder} />;
          })}
        </svg>
      )}
    </SettingsContext.Consumer>
  );
};

const Rute = ({ farge, på, visKoder, min, max, tittel, kode }) => {
  const colorOff = rutefarge(false, farge);
  const color = rutefarge(på, farge);
  return (
    <React.Fragment key={min}>
      <rect
        x={min}
        width={max - min}
        y={0}
        height={gaugeHeight}
        rx={0}
        stroke="none"
      >
        <title>{tittel.nb}</title>
        <animate
          attributeName="fill"
          dur="0.75s"
          values={`${colorOff}; ${farge}; ${farge}; ${color}; ${color}`}
          keyTimes={`0; ${min * 0.005}; 0.5; ${0.75 + min * 0.0}; 1`}
          fill="freeze"
        />
        <animate
          attributeName="fill"
          dur="0.2s"
          begin="mouseover"
          values={`${color}; ${farge}`}
          keyTimes="0; 1"
          fill="freeze"
        />
        <animate
          attributeName="fill"
          dur="0.6s"
          begin="mouseout"
          values={`${farge}; ${color}`}
          keyTimes="0; 1"
          fill="freeze"
        />
      </rect>
      {max < 100 && (
        <line
          x1={max}
          x2={max}
          y1={0}
          y2={gaugeHeight}
          strokeWidth="0.5"
          stroke="rgba(0,0,0,0.17)"
        />
      )}
      {visKoder && (
        <text
          x={0.5 * (min + max)}
          y={0.53 * gaugeHeight}
          fontSize={3.8}
          fontWeight="500"
          fill={contrastingColor(color)}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {kode[kode.length - 1].toLowerCase()}
        </text>
      )}
    </React.Fragment>
  );
};

const Etikett = ({ x1, x2 }) => {
  return (
    <path
      d={`M${x1} ${gaugeHeight} C ${x1} ${gaugeHeight +
        5}, ${x2} ${gaugeHeight}, ${x2} ${gaugeHeight + 4}`}
      stroke="rgba(0,0,0,0.37)"
      strokeWidth={0.5}
      fill="transparent"
      strokeDasharray="100px"
      strokeDashoffset="100px"
    >
      <animate
        begin="0.75s"
        attributeName="stroke-dashoffset"
        from="100px"
        to="0px"
        dur="0.4s"
        fill="freeze"
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
