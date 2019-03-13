import React from "react";

function normaliser(stats) {
  let ymax = 0;
  let ymax2 = 0;
  for (const v of stats.fordeling) {
    ymax = Math.max(ymax, v);
    if (v < ymax) ymax2 = Math.max(ymax2, v);
  }
  ymax = 0.5 * (ymax + ymax2);
  const r = stats.fordeling.map(y => Math.min(100, (100 * y) / ymax));
  return r;
}

const logx = false;

const Kurve = ({ stats, gradient }) => {
  let ymax = 0;
  for (const v of stats.fordeling) ymax = Math.max(ymax, v);
  const line =
    "0,0 " +
    normaliser(stats)
      .map(
        (y, i) =>
          `${logx ? Math.log10(i + 1) * 50 : i},${-50 * Math.log10(y + 1)}`
      )
      .join(" ") +
    " 0,0";
  return (
    <svg
      style={{ paddingLeft: 6 }}
      height="155"
      width="392"
      viewBox="-1 -1 258 101"
    >
      <defs>
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
      {false && (
        <image
          xlinkHref="https://bennettfeely.com/gradients/img/gradient.webp"
          height="100%"
          width="100%"
          preserveAspectRatio="none"
          id="path1"
        />
      )}
      {true && (
        <image
          xlinkHref={gradient}
          height="100%"
          width="100%"
          preserveAspectRatio="none"
          id="path1"
        />
      )}
      <g transform="translate(0,100)">
        <polyline
          points={line}
          style={{
            fill: "#ccc",
            stroke: "rgba(0,0,0,0.4)",
            strokeWidth: 0.5,
            filter: "url(#shadow)"
          }}
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            from="1 0"
            to="1 1"
            begin="0s"
            dur="0.8s"
            repeatCount="1"
          />
        </polyline>
      </g>
      )} />
    </svg>
  );
};

export default Kurve;
