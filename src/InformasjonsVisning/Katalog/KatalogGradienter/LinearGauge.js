import språk from "Funksjoner/språk";
import React, { Component } from "react";
import tinycolor from "tinycolor2";
import { ListItem, Typography } from "@material-ui/core";
import { SettingsContext } from "SettingsContext";
import prettyKode from "Funksjoner/prettyKode";
import språk from "Funksjoner/språk";

const gaugeHeight = 7;

function contrastingColor(erPå, color) {
  const luminance = new tinycolor(color).getLuminance();
  const a = erPå ? 0.7 : 0.3;
  return luminance > 0.5 ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a})`;
}

function rutefarge(erPå, col) {
  if (erPå) return col;
  return tinycolor.mix(col, new tinycolor("#eee"), 90).toHexString();
}

export default class KlassedeltGradient extends Component {
  render() {
    const {
      tittel,
      trinn,
      onMouseEnter,
      onMouseLeave,
      onNavigate,
      url,
      kode,
      opplyst,
      visKoder
    } = this.props;
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
      <ListItem
        button
        dense
        style={{ root: { marginRight: 0 } }}
        onClick={() => onNavigate(url)}
        onMouseEnter={() => onMouseEnter({ kode, url })}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        <div style={{ width: "100%" }}>
          {visKoder && (
            <Typography
              variant="caption"
              style={{
                color: "rgba(0,0,0,0.34)",
                fontWeight: 600,
                position: "absolute",
                top: 12,
                right: 22
              }}
            >
              {prettyKode(kode)}
            </Typography>
          )}
          <Typography>{tittel}</Typography>
          <Gradienttrinn
            onMouseEnter={onMouseEnter}
            onMouseLeave={() => onMouseEnter({ kode, url })}
            trinn={trinn}
            range={påRange}
            opplyst={opplyst}
          />
          <div
            style={{
              display: "flex",
              position: "relative",
              top: -5
            }}
          >
            <Typography
              variant="caption"
              style={{
                width: "50%",
                textAlign: "center"
              }}
            >
              {språk(påRange[0].tittel)}
            </Typography>
            {påFra !== påTil && (
              <Typography
                variant="caption"
                style={{
                  width: "50%",
                  textAlign: "center"
                }}
              >
                {språk(påRange[1].tittel)}
              </Typography>
            )}
          </div>
        </div>
      </ListItem>
    );
  }
}

const Gradienttrinn = ({
  trinn,
  range,
  opplyst,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <SettingsContext.Consumer>
      {context => (
        <svg viewBox="0 -2 102 13">
          <defs>
            <filter id="av" x="-2" y="0" width="104" height="10">
              <feDropShadow
                dx="0.0"
                dy="0.0"
                stdDeviation="0.0"
                floodOpacity="0.0"
              />
            </filter>
            <filter id="på" x="-2" y="0" width="104" height="10">
              <feDropShadow
                dx="0.2"
                dy="0.2"
                stdDeviation="0.1"
                floodOpacity="0.3"
              />
            </filter>
            <filter id="opplyst" x="0" y="0" width="106" height="12">
              <feDropShadow
                dx="0.9"
                dy="0.9"
                stdDeviation="1.0"
                floodOpacity="0.3"
              />
              )}
            </filter>
          </defs>
          {trinn.map(e => {
            return (
              !e.på && (
                <Rute
                  key={e.kode}
                  {...e}
                  visKoder={context.visKoder}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              )
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
              e.på && (
                <Rute
                  key={e.kode}
                  {...e}
                  visKoder={context.visKoder}
                  opplyst={e.url === opplyst.url}
                  onMouseEnter={() =>
                    onMouseEnter({
                      kode: e.kode,
                      url: e.url
                    })
                  }
                  onMouseLeave={onMouseLeave}
                />
              )
            );
          })}
        </svg>
      )}
    </SettingsContext.Consumer>
  );
};

const textSize = {
  av: 3.8,
  på: 3.8,
  opplyst: 4.5
};
const rutestil = {
  av: {
    rx: 0,
    y: 0.75,
    height: gaugeHeight - 1.5,
    stroke: "rgba(0,0,0,0.11)"
  },
  på: {
    rx: 0.5,
    y: 0,
    height: gaugeHeight,
    stroke: "rgba(99,99,99,0.55)"
  },
  opplyst: {
    rx: 0.5,
    y: -0.75,
    height: gaugeHeight + 1.5,
    stroke: "rgba(99,99,99,0.85)"
  }
};

const Rute = ({
  farge,
  på,
  visKoder,
  opplyst,
  min,
  max,
  tittel,
  kode,
  onMouseEnter,
  onMouseLeave
}) => {
  const colorOff = rutefarge(false, farge);
  const color = rutefarge(på, farge);
  const state = opplyst ? "opplyst" : på ? "på" : "av";
  return (
    <React.Fragment key={min}>
      <rect
        x={min}
        width={max - min}
        strokeWidth={0.4}
        fill={colorOff}
        filter={`url(#${state})`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rutestil[state]}
      >
        <title>{språk(tittel)}</title>
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
          fontSize={textSize[state]}
          fontWeight="500"
          fill={contrastingColor(på, color)}
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
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
