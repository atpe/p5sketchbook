/**
 * @module MandlebrotSet
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports
import MandlebrotSet from './mandlebrotSet'

export function mandlebrotSetActions(actions) {
  return (
    <>
      <CardActions>
        <Button onClick={(e) => { actions.start(); e.preventDefault() }}>Start</Button>
        <Button onClick={(e) => { actions.pause(); e.preventDefault() }}>Pause</Button>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main mandlebrotSet sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function mandlebrotSetSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /** Starts the sketch */
  function start() {
    sketch.loop()
  }

  /** Pauses the sketch */
  function pause() {
    sketch.noLoop()
  }

  /** Resets the sketch */
  function reset() {
    sketch.background(0, 0, (120 / 255) * 100)
    sketch.mandlebrotSet.reset()
  }

  /** Sets up the sketch */
  function setup() {
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
    sketch.mandlebrotSet = new MandlebrotSet(size, min, max)
  }

  /** Draws the sketch */
  function draw() {
    if (sketch.isLooping()) {
      sketch.push()
      sketch.mandlebrotSet.iterate(sketch)
      sketch.pop()
      sketch.fill(255)
      sketch.text(sketch.mandlebrotSet.iterations + ' iterations completed', 10, 20)
    }
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.draw = () => draw()
}