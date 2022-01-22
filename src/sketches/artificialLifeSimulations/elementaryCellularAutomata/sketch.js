// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  // Get canvas width and height
  const { clientWidth, clientHeight } = ref.current
  // Instantiate new selection sort
  sketch.cellularAutomata = new Algorithm(clientWidth, clientHeight, 99)

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
    sketch.cellularAutomata.reset()
    sketch.redraw()
  }
  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.pixelDensity(1)
    sketch.noLoop()
  }
  // Draws the sketch
  sketch.draw = () => {
    sketch.background(120)
    sketch.cellularAutomata.iterate()
    sketch.cellularAutomata.draw(sketch)

    sketch.text(sketch.frameRate().toFixed(1), 10, 20)
  }
}