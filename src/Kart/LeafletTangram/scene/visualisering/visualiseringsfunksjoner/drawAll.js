function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ["gradient_" + drawArgs.kode]: {
          order: 700
        }
      }
    }
  };
  return layer;
}
export default drawAll;
