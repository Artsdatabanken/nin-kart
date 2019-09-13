export default function drawSetup(drawArgs, source, where) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: source },
      draw: {
        [where]: {
          order: 700
        }
      }
    }
  };
  return layer;
}
