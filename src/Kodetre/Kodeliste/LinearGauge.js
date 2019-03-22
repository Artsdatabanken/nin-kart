import språk from "../../språk";
import React, { Component } from "react";
import tinycolor from "tinycolor2";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { SettingsContext } from "../../SettingsContext";
import prettyKode from "./prettyKode";

const gaugeHeight = 7;

function contrastingColor(erPå, color) {
  const luminance = new tinycolor(color).getLuminance();
  const a = erPå ? 0.57 : 0.3;
  return luminance > 0.5 ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a})`;
}

function rutefarge(erPå, col) {
  if (erPå) return col;
  return tinycolor.mix(col, new tinycolor("#eee"), 90).toHexString();
}

export default class KlassedeltGradient extends Component {
  render() {
    const { tittel, trinn, onNavigate, url, kode, visKoder } = this.props;
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
        {visKoder && (
          <Typography
            variant="body2"
            style={{
              color: "rgba(0,0,0,0.44)",
              position: "absolute",
              top: 6,
              right: 40
            }}
          >
            {prettyKode(kode)}
          </Typography>
        )}
        <ListItemText
          primary={tittel}
          secondary={
            <>
              <Gradienttrinn trinn={trinn} range={påRange} />
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
            </>
          }
        />
      </ListItem>
    );
  }
}

const Gradienttrinn = ({ trinn, range }) => {
  return (
    <SettingsContext.Consumer>
      {context => (
        <svg viewBox="-3 -1 104 13">
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
          {trinn.map(e => {
            return (
              !e.på && <Rute key={e.kode} {...e} visKoder={context.visKoder} />
            );
          })}

          {range &&
            [range].map(([min, max]) => (
              <React.Fragment key={min.min}>
                <Etikett x1={0.5 * (min.min + min.max)} x2={25} />
                {min !== max && (
                  <Etikett x1={0.5 * (max.min + max.max)} x2={75} />
                )}
              </React.Fragment>
            ))}
          {trinn.map(e => {
            return (
              e.på && <Rute key={e.kode} {...e} visKoder={context.visKoder} />
            );
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
        y={på ? 0 : 0.75}
        height={på ? gaugeHeight : gaugeHeight - 1.5}
        rx={på ? 1.5 : 0}
        stroke={på ? "rgba(99,99,99,0.55)" : "rgba(0,0,0,0.11)"}
        strokeWidth={0.4}
        fill={colorOff}
        filter={på ? "url(#f2)" : null}
      >
        <title>{tittel.nb}</title>
        <animate
          attributeName="fill"
          begin="0.2s"
          dur="1.3s"
          values={`${colorOff}; ${farge}; ${farge}; ${color}; ${color}`}
          keyTimes={`0; ${min * 0.005}; 0.5; ${0.5 + min * 0.005}; 1`}
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
      {visKoder && (
        <text
          x={0.5 * (min + max)}
          y={0.53 * gaugeHeight}
          fontSize={3.8}
          fontWeight="500"
          fill={contrastingColor(på, color)}
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
      d={`M${x1} ${gaugeHeight} C ${x1} ${gaugeHeight + 5}, ${0.5 *
        (x1 + x2)} ${gaugeHeight + 2}, ${x2} ${gaugeHeight + 4}`}
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
        dur="0.6s"
        fill="freeze"
      />
    </path>
  );
};
