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
    let påFra = 99;
    const påRange = [];
    for (let i = 0; i < antall; i++) {
      const t = trinn[i];
      t.min = (100 / antall) * i;
      t.max = (100 / antall) * (i + 1);
      if (t.på && påFra > i) påFra = i;
      if (!t.på && påFra < i) {
        påRange.push([trinn[påFra], trinn[i - 1]]);
        påFra = 99;
      }
    }
    if (påFra < antall) påRange.push([trinn[påFra], trinn[antall - 1]]);
    return (
      <ListItem button dense onClick={() => onNavigate(url)}>
        <ListItemText
          primary={tittel}
          secondary={
            <React.Fragment>
              <Gauge trinn={trinn} ranges={påRange} />
              {beskrivelse(påRange)}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }
}

const beskrivelse = ranges => {
  return ranges
    .map(([min, max]) => {
      let range = min.tittel.nb;
      if (min.tittel.nb !== max.tittel.nb) range += "–" + max.tittel.nb;
      return range;
    })
    .join(", ");
};

const Gauge = ({ trinn, ranges }) => {
  return (
    <svg viewBox="-1 -1 102 9.2">
      <defs>
        <filter id="f1" x="0" y="0" width="102" height="10">
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
      {true &&
        ranges.map(([min, max]) => (
          <Shadow
            key={min}
            x1={min.min}
            y1={0}
            x2={max.max}
            y2={gaugeHeight}
            color1="rgba(128,128,128,0.9)"
          />
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
