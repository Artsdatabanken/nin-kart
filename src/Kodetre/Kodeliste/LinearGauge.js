import React, { Component } from "react";
import tinycolor from "tinycolor2";
import { ListItem, ListItemText } from "@material-ui/core";

const gaugeHeight = 6;

function farge(erPå, col) {
  if (erPå) return col;
  //return "#eee";
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
            <div>
              <Gauge trinn={trinn} ranges={påRange} />
              {beskrivelse(påRange)}
            </div>
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
    <svg viewBox="-1 -1 102 7.1">
      <rect
        x={0}
        y={0}
        width={100}
        height={gaugeHeight}
        fill="url(#grad1)"
        style={{ xfilter: "url(#ag)" }}
        stroke="rgba(0,0,0,0.67)"
        strokeWidth={0.25}
      />
      {trinn.map(e => (
        <g key={e.min}>
          <rect
            x={e.min}
            width={e.max - e.min}
            y={0}
            height={gaugeHeight}
            fill={farge(e.på, e.farge)}
            stroke="none"
          >
            <title>{e.tittel.nb}</title>
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
          {false && !e.på && <Cross min={e.min} max={e.max} />}
        </g>
      ))}
      {ranges.map(([min, max]) => (
        <Shadow
          x1={min.min + 0.2}
          y1={0 + 0.2}
          x2={max.max - 0.4}
          y2={gaugeHeight - 0.2}
          color1="#bbb"
          color2="#888"
        />
      ))}
    </svg>
  );
};

const Shadow = ({ x1, x2, y1, y2, color1, color2 }) => {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x1} y2={y2} stroke={color1} strokeWidth="0.5" />
      <line x1={x1} y1={y1} x2={x2} y2={y1} stroke={color1} strokeWidth="0.5" />
      <line x1={x2} y1={y1} x2={x2} y2={y2} stroke={color2} strokeWidth="0.5" />
      <line x1={x1} y1={y2} x2={x2} y2={y2} stroke={color2} strokeWidth="0.5" />
    </g>
  );
};

const Cross = ({
  min,
  max,
  stroke = "rgba(128,128,128,0.3)",
  strokeWidth = 0.5
}) => {
  return (
    <g>
      {false && (
        <line
          x1={min}
          y1={0}
          x2={max}
          y2={gaugeHeight}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
      <line
        x1={min}
        y1={gaugeHeight}
        x2={max}
        y2={0}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};
