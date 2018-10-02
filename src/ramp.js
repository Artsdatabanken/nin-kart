function createColorTexture(canvas) {
  const context = canvas.getContext('2d')
  canvas.width = 256
  canvas.height = 1

  for (let i = 0; i < canvas.width; i++) {
    context.fillStyle = map(i)
    context.fillRect(i, 0, 1, canvas.height)
  }

  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  console.log(image)
  return image
}

function lookupColor(steps, i) {
  return i % 2 ? 'rgba(120,255,255,1.0)' : 'rgba(20,55,255,1.0)'
}

function map(steps, i) {
  const color = lookupColor(steps, i)
  return color
}

export { createColorTexture }
