// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  // Resets the sketch
  sketch.reset = () => {
    sketch.cantorSet.reset()
    sketch.redraw()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)
    sketch.noLoop()

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const size = sketch.createVector(clientWidth, clientHeight)

    sketch.cantorSet = new Algorithm(center, size)
  }

  // Called when the mouse is clicked
  sketch.mouseClicked = () => {
    if (sketch.cantorSet.complete) return
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (!(left || right || above || below)) {
      sketch.cantorSet.iterate()
      sketch.redraw()
    }
  }

  // Draws the sketch
  sketch.draw = () => {
    sketch.push()
    sketch.background(120)
    sketch.cantorSet.draw(sketch)
    sketch.pop()
  }
}