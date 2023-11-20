const styles = {
  po: {
    base: "points",
    texture: "/marker.png",
  },
  boundary: {
    base: "lines",
    order: 150,
    blend: "overlay",
  },
  translucent_polygons: {
    base: "polygons",
    blend: "translucent",
  },
  multiply_polygons: {
    base: "polygons",
    blend: "multiply",
  },
  translucent_lines: {
    base: "lines",
    blend: "translucent",
  },
  multiply_lines: {
    base: "lines",
    //dash: [1, 1],
    blend: "multiply",
  },
  road_names: {
    base: "text",
    draw: {
      font: {
        family: "Chivo",
        size: "12px",
        fill: "black",
        stroke: {
          color: "white",
          width: "1px",
        },
      },
    },
  },
};

function createStyles() {
  return styles;
}

export { createStyles };
