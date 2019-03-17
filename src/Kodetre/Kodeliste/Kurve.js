import React, { useRef, useState } from "react";

function normaliser(stats, grad = []) {
  let ymax = 0;
  let ymax2 = 0;
  for (const v of stats) {
    ymax = Math.max(ymax, v);
    if (v < ymax) ymax2 = Math.max(ymax2, v);
  }
  const scaler = 1.0 / (0.2 * ymax + 0.8 * ymax2);
  const r = stats.map(y => Math.min(100, 100 * y * scaler));
  return { fordeling: r, max: ymax };
}

function prep(stats, grad) {
  return stats.map((y, i) => y / (grad[i] || 1));
}

const logx = false;

const Kurve = ({ stats, gradient }) => {
  const [visNormalisert, setVisNormalisert] = useState(true);
  let animateRef = useRef();
  const lnorm = normaliser(prep(stats.fordeling, stats.grad));
  const lnormf = lnorm.fordeling.map(
    (y, i) => `${logx ? Math.log10(i + 1) * 50 : i},${-50 * Math.log10(y + 1)}`
  );
  const l = normaliser(stats.fordeling);

  const lineNorm = "0,0 " + lnormf.join(" ") + " 255,0 0,0";
  const line =
    "0,0 " +
    l.fordeling
      .map(
        (y, i) =>
          `${logx ? Math.log10(i + 1) * 50 : i},${-50 * Math.log10(y + 1)}`
      )
      .join(" ") +
    " 255,0 0,0";
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
            dx="0"
            dy="0"
            stdDeviation="0"
            floodColor="#777"
            floodOpacity="1"
          />
        </filter>
      </defs>
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="dx"
        values="0;2"
        begin="path1.mouseover"
        end=""
        dur="0.3s"
        fill="freeze"
      />
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="dx"
        values="2;0"
        begin="path1.mouseout"
        end=""
        dur="0.5s"
        fill="freeze"
      />
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="dy"
        values="0;2"
        begin="path1.mouseover"
        end=""
        dur="0.3s"
        fill="freeze"
      />
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="dy"
        values="2;0"
        begin="path1.mouseout"
        end=""
        dur="0.5s"
        fill="freeze"
      />
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="stdDeviation"
        from="0,0"
        to="2,2"
        begin="path1.mouseover"
        end=""
        dur="0.3s"
        fill="freeze"
      />
      <animate
        id="animate_node_shadow"
        xlinkHref="#node_shadow"
        attributeName="stdDeviation"
        from="2,2"
        to="0,0"
        begin="path1.mouseout"
        end=""
        dur="0.5s"
        fill="freeze"
      />
      <rect
        x="-0.5"
        y="0"
        width="256"
        height="100"
        style={{
          fill: "#fff",
          stroke: "rgba(0,0,0,0.3)",
          strokeWidth: 0.5
        }}
      />
      {true && (
        <image
          xlinkHref={gradient}
          height="10"
          width="100%"
          preserveAspectRatio="none"
          id="path1"
          filter="url(#dim)"
        />
      )}
      <g transform="translate(0,100)">
        <polyline
          id={visNormalisert ? "a" : "b"}
          style={{
            fill: "#ccc",
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
            from={visNormalisert ? line : lineNorm}
            to={visNormalisert ? lineNorm : line}
            fill="freeze"
          />
        </polyline>
      </g>
      <text x="5" y="9" fill="rgba(0,0,0,0.55)" fontSize={9}>
        {visNormalisert ? "p" : "A"}
        {false && (visNormalisert ? lnorm.max : l.max)}
      </text>
      )} />
    </svg>
  );
};

export default Kurve;
