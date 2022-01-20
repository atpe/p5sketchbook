// Local component imports
import Algorithm from './algorithm'

export default function sketch(sketch, ref) {
  const { clientWidth, clientHeight } = ref.current

  // Starts the sketch
  function start() {
    sketch.juliaSet.start()
  }

  // Pauses the sketch
  function pause() {
    sketch.juliaSet.pause()
  }

  // Resets the sketch
  function reset() {
    sketch.background(0, 0, (120 / 255) * 100)
    sketch.juliaSet.reset()
  }

  // Sets up the sketch
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)

    sketch.pixelDensity(1)
    sketch.background(120)
    sketch.colorMode(sketch.HSB)

    const size = sketch.createVector(clientWidth, clientHeight)
    const ratio = clientWidth / clientHeight
    const left = -2
    const right = 2
    const height = (right - left) / ratio
    const max = sketch.createVector(right, height / 2)
    const min = sketch.createVector(left, -height / 2)

    sketch.juliaSet = new Algorithm(size, min, max)
  }

  // Draws the sketch
  function draw() {
    sketch.push()
    if (sketch.juliaSet.iterating) {
      sketch.juliaSet.iterate(sketch)
      sketch.fill(255)
      sketch.text(sketch.juliaSet.iterations + ' iterations completed', 10, 20)
    } else if (sketch.juliaSet.iterations === 0) {
      sketch.background(0, 0, 47)
      sketch.juliaSet.movePoint(sketch)
      sketch.strokeWeight(5)
      sketch.stroke(340, 84, 100)
      sketch.point(sketch.juliaSet.point)
      sketch.noStroke()
      sketch.fill(255)
      sketch.text(sketch.juliaSet.text, 10, 20)
    }
    sketch.pop()
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.draw = () => draw()
}