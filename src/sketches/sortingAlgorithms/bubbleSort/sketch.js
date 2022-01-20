// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  // Get canvas width and height
  const { clientWidth, clientHeight } = ref.current
  // Instantiate new selection sort
  sketch.selectionSort = new Algorithm(clientWidth, clientHeight)

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
    sketch.selectionSort.reset()
    sketch.redraw()
  }
  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.noLoop()
    sketch.frameRate(10)
  }
  // Draws the sketch
  sketch.draw = () => {
    sketch.background(120)
    if (sketch.isLooping()) sketch.selectionSort.sort()
    sketch.selectionSort.draw(sketch)
    sketch.selectionSort.highlight(sketch)
  }
}