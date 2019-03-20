import React, { useRef, useState } from "react";

const expo = (y, log) => (log ? Math.log10(y + 1) : y);

function normaliser(stats, logY) {
  let ymax = 0;
  let ymax2 = 0;
  for (const sample of stats) {
    const v = expo(sample, logY);
    ymax = Math.max(ymax, v);
    if (v < ymax) ymax2 = Math.max(ymax2, v);
  }
  const scaler = 1.0 / (0.2 * ymax + 0.8 * ymax2);
  const r = stats.map(y => Math.min(100, 100 * expo(y, logY) * scaler));
  return { fordeling: r, max: ymax };
}

function prep(stats, grad) {
  if (!stats) return grad;
  return stats.map((y, i) => y / (grad[i] || 1));
}

const scale = (samples, logX) =>
  samples.map((y, i) => `${logX ? Math.log10(i + 1) * 50 : i},${y}`);

const Kurve = ({ kode, stats, gradient, logX, logY }) => {
  const [visNormalisert, setVisNormalisert] = useState(logY);
  let animateRef = useRef();
  const lnorm = normaliser(prep(stats.fordeling, stats.grad), !visNormalisert);
  const lnormf = scale(lnorm.fordeling, logX);
  //  const l = normaliser(stats.fordeling || stats.grad, visNormalisert);
  const l = normaliser(prep(stats.fordeling, stats.grad), visNormalisert);

  const lineNorm = "0,0 " + lnormf.join(" ") + " 255,0 0,0";
  const line = "0,0 " + scale(l.fordeling, logX).join(" ") + " 255,0 0,0";
  return (
    <svg
      onClick={() => {
        setVisNormalisert(!visNormalisert);
        animateRef.current.beginElement();
      }}
      style={{ paddingLeft: 6 }}
      height="50%"
      width="100%"
      viewBox="-1 -1 258 101"
      id="path1"
    >
      <defs>
        <filter
          id="dim"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="linearRGB"
        >
          <feColorMatrix
            type="matrix"
            values="0.7 0.1 0.1 0.1 0
0.1 0.7 0.1 0.1 0
0.1 0.1 0.7 0 0
0.1 0.1 0.1 500 -20"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            result="colormatrix1"
          />
        </filter>
        <filter id="shadow">
          <feDropShadow
            id="node_shadow"
            dx="2"
            dy="2"
            stdDeviation="2"
            floodColor="#aaa"
            floodOpacity="1"
          />
        </filter>
        <pattern id={kode} width="100%" height="100%">
          <image
            xlinkHref={gradient}
            height="100%"
            width="100%"
            preserveAspectRatio="none"
            _filter="url(#dim)"
          />
        </pattern>
      </defs>
      <rect
        x="-0.5"
        y="0"
        width="257"
        height="100"
        style={{
          fill: "#eee",
          stroke: "rgba(0,0,0,0.3)",
          strokeWidth: 0.5
        }}
      />
      <g transform="translate(0,99) scale(1 -1)">
        <polyline
          style={{
            fill: "url(#" + kode + ")",
            stroke: "rgba(0,0,0,0.4)",
            strokeWidth: 0.5,
            filter: "url(#shadow)"
          }}
        >
          <animate
            ref={animateRef}
            attributeName="points"
            dur="0.5s"
            calcMode="spline"
            keySplines="0.5,0.05,0,0.5"
            keyTimes="0;1"
            repeatCount="1"
            from={lineNorm}
            to={line}
            fill="freeze"
          />
        </polyline>
      </g>
      <text x="5" y="9" fill="rgba(0,0,0,0.55)" fontSize={8}>
        {visNormalisert ? "log" : "lin"}
        {false && (visNormalisert ? lnorm.max : l.max)}
      </text>
      )} />
    </svg>
  );
};

export default Kurve;
