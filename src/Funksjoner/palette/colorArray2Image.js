function colorArray2Image(colorarray, blendmode, opacity) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = Math.max(
    256,
    Math.pow(2, Math.ceil(Math.log2(colorarray.length)))
  );
  canvas.height = 1;
  for (let i = 0; i < canvas.width; i++) {
    const color = colorarray[i] || "#ffffff";
    context.fillStyle = color;
    if (blendmode && blendmode !== "multiply") {
      if (opacity) {
        context.globalAlpha = opacity;
      } else {
        context.globalAlpha = 1;
      }

      if (!colorarray[i] || colorarray[i] === "#ffffff") {
        context.globalAlpha = 0;
        context.fillStyle = "rgba(0,0,0,0)";
      }
    }
    context.fillRect(i, 0, 1, canvas.height);
  }
  return canvas.toDataURL();
}

export default colorArray2Image;
