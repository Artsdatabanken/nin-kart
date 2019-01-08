function createPalette(colorarray) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 1;

  for (let i = 0; i < canvas.width; i++) {
    const color = colorarray[i] || "#fff";
    context.fillStyle = color;
    context.fillRect(i, 0, 1, canvas.height);
  }

  return canvas.toDataURL();
  //  return context.getImageData(0, 0, canvas.width, canvas.height)
}

export default createPalette;
