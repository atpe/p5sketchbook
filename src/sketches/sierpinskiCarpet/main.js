/**
 * @module SierpinskiCarpet
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// Local component imports
import SierpinskiCarpet from './sierpinskiCarpet'

export function sierpinskiCarpetActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Click the canvas to add another iteration to the carpet (May take longer at higher iterations).
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main Sierpiński carpet sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function sierpinskiCarpetSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /** Resets the sketch */
  function reset() {
    sketch.sierpinskiCarpet.reset()
    sketch.redraw()
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.rectMode(sketch.CENTER)
    sketch.noLoop()

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const min = Math.min(clientWidth, clientHeight)
    const size = sketch.createVector(min, min)

    sketch.sierpinskiCarpet = new SierpinskiCarpet(center, size)
  }

  /** IS called when the mouse is clicked */
  function mouseClicked() {
    if (sketch.sierpinskiCarpet.complete) return
    const left = sketch.mouseX < 0
    const right = sketch.mouseX > clientWidth
    const above = sketch.mouseY < 0
    const below = sketch.mouseY > clientHeight
    if (!(left || right || above || below)) {
      sketch.sierpinskiCarpet.iterate()
      sketch.redraw()
    }
  }

  /** Draws the sketch */
  function draw() {
    sketch.push()
    sketch.background(120)
    sketch.sierpinskiCarpet.draw(sketch)
    sketch.pop()
  }

  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.mouseClicked = () => mouseClicked()
  sketch.draw = () => draw()
}