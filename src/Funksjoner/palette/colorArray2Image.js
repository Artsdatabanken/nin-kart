function colorArray2Image(colorarray, blendmode) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = Math.max(
    256,
    Math.pow(2, Math.ceil(Math.log2(colorarray.length)))
  );
  canvas.height = 1;

  for (let i = 0; i < canvas.width; i++) {
    const color = colorarray[i] || "#fff";
    context.fillStyle = color;
    if (blendmode && blendmode !== "multiply") {
      if (colorarray[i] === "#ffffff") {
        context.fillStyle = "#ffffff0";
        console.log("hfhj");
      }
    }
    context.fillRect(i, 0, 1, canvas.height);
  }
  return canvas.toDataURL();
}

export default colorArray2Image;
