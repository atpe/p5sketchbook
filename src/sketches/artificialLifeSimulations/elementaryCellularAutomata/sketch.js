// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  // Get canvas width and height
  const { clientWidth, clientHeight } = ref.current

  // Starts the sketch
  sketch.start = () => {
    sketch.loop()
  }

  // Pauses the sketch
  sketch.pause = () => {
    sketch.noLoop()
  }

  // Resets the sketch
  sketch.reset = () => {
    if (sketch.cellularAutomaton) sketch.cellularAutomaton.reset()
    else {
      for (let rule = 0; rule < 256; rule++) {
        sketch.cellularAutomata[rule].reset()
      }
    }
    sketch.redraw()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.background(120)
    sketch.noStroke()
    sketch.fill(255)
    sketch.noLoop()

    sketch.cellularAutomata = []

    const remX = clientWidth % 16
    const remY = clientHeight % 16

    sketch.imageWidth = (clientWidth - remX) / 16
    sketch.imageHeight = (clientHeight - remY) / 16

    sketch.offsetX = remX / 2
    sketch.offsetY = remY / 2

    for (let rule = 0; rule < 256; rule++) {
      const image = sketch.createGraphics(sketch.imageWidth, sketch.imageHeight)
      sketch.cellularAutomata[rule] = new Algorithm(image, rule)
    }
  }

  // Called when mouse is clicked
  sketch.mouseClicked = () => {
    if (
      sketch.mouseX < sketch.offsetX || sketch.mouseX > clientWidth - sketch.offsetX ||
      sketch.mouseY < sketch.offsetY || sketch.mouseY > clientHeight - sketch.offsetY
    ) return

    const i = Math.floor((sketch.mouseX - sketch.offsetX) / sketch.imageWidth)
    const j = Math.floor((sketch.mouseY - sketch.offsetY) / sketch.imageHeight)
    const rule = i + j * 16
    const image = sketch.createGraphics(clientWidth, clientHeight)
    sketch.cellularAutomaton = new Algorithm(image, rule)
    if (!sketch.isLooping()) sketch.redraw()
  }

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.ESCAPE) {
      sketch.cellularAutomaton = undefined
      sketch.background(120)
      if (!sketch.isLooping()) sketch.redraw()
    }
  }

  // Draws the sketch
  sketch.draw = () => {
    if (sketch.cellularAutomaton) {
      sketch.cellularAutomaton.iterate()
      sketch.cellularAutomaton.draw(sketch, 0, 0)
    } else {
      for (let rule = 0; rule < 256; rule++) {
        sketch.cellularAutomata[rule].iterate()

        const i = rule % 16
        const j = (rule - i) / 16
        const x = i * sketch.imageWidth + sketch.offsetX
        const y = j * sketch.imageHeight + sketch.offsetY

        sketch.cellularAutomata[rule].draw(sketch, x, y)

        const off = sketch.textSize()
        sketch.text(rule, x + off / 4, y + off)
      }
    }
  }
}