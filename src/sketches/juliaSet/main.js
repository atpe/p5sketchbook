/**
 * @module JuliaSet
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// Local component imports
import JuliaSet from './juliaSet'

export function juliaSetActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Use the W, A, S, and D keys to move the point around the canvas, then click 'START' to iterate.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.start(); e.preventDefault() }}>Start</Button>
        <Button onClick={(e) => { actions.pause(); e.preventDefault() }}>Pause</Button>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main juliaSet sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function juliaSetSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /** Starts the sketch */
  function start() {
    sketch.juliaSet.start()
  }

  /** Pauses the sketch */
  function pause() {
    sketch.juliaSet.pause()
  }

  /** Resets the sketch */
  function reset() {
    sketch.background(0, 0, (120 / 255) * 100)
    sketch.juliaSet.reset()
  }

  /** Sets up the sketch */
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

    sketch.juliaSet = new JuliaSet(size, min, max)
  }

  /** Draws the sketch */
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