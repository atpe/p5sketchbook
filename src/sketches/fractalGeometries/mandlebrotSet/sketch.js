// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
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
    sketch.background(0, 0, (120 / 255) * 100)
    sketch.mandlebrotSet.reset()
  }

  // Sets up the sketch
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)

    sketch.pixelDensity(1)
    sketch.background(120)
    sketch.colorMode(sketch.HSB)

    sketch.noLoop()

    const size = sketch.createVector(clientWidth, clientHeight)
    const ratio = clientWidth / clientHeight
    const left = -2
    const right = 1
    const height = (right - left) / ratio
    const max = sketch.createVector(right, height / 2)
    const min = sketch.createVector(left, -height / 2)
    sketch.mandlebrotSet = new Algorithm(size, min, max)
  }

  // Draws the sketch
  sketch.draw = () => {
    if (sketch.isLooping()) {
      sketch.push()
      sketch.mandlebrotSet.iterate(sketch)
      sketch.pop()
      sketch.fill(255)
      sketch.text(sketch.mandlebrotSet.iterations + ' iterations completed', 10, 20)
    }
  }
}