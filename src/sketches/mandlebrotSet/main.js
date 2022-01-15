/**
 * @module MandlebrotSet
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MandlebrotSet from './mandlebrotSet'
// Local component imports

export function mandlebrotSetActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          ...
        </Typography>
      </CardContent>
      <CardActions>
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

  /**
   * Resets the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function reset(sketch) {

  }

  /**
   * Sets up the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function setup(sketch) {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.pixelDensity(1)
    sketch.colorMode(sketch.HSB)
    // sketch.frameRate(1)
    const size = sketch.createVector(clientWidth, clientHeight)
    const ratio = clientWidth / clientHeight
    const left = -2
    const right = 1
    const height = (right - left) / ratio
    const max = sketch.createVector(right, height / 2)
    const min = sketch.createVector(left, -height / 2)
    sketch.mandlebrotSet = new MandlebrotSet(size, min, max)
  }

  /** Is called when mouse is pressed */
  function mouseClicked() {
    // sketch.mandlebrotSet.iterate(sketch)
  }

  /**
   * Draws the sketch
   * 
   * @param {Function} sketch The p5.js sketch function
   */
  function draw(sketch) {
    sketch.push()
    sketch.mandlebrotSet.iterate(sketch)
    sketch.pop()
  }

  sketch.reset = () => reset(sketch)
  sketch.setup = () => setup(sketch)
  sketch.mouseClicked = () => mouseClicked(sketch)
  sketch.draw = () => draw(sketch)
}