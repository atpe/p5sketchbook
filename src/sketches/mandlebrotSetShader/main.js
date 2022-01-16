/**
 * @module MandlebrotSet
 * @author Adam Evans
 */

// MUI component imports
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
// Local component imports

export function mandlebrotSetShaderActions(actions) {
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

/** Main mandlebrotSetShader sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function mandlebrotSetShaderSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  /** Resets the sketch */
  function reset() {

  }


  function preload() {
    const vert = '/shaders/mandlebrotSetShader/mandlebrot.vert'
    const frag = '/shaders/mandlebrotSetShader/mandlebrot.frag'
    sketch.mandlebrotSetShader = sketch.loadShader(vert, frag)
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight, sketch.WEBGL)

    sketch.pixelDensity(1)
    sketch.background(120)

    sketch.noLoop()

    const ratio = clientWidth / clientHeight
    const left = -2
    const right = 1
    const height = (right - left) / ratio
    const size = sketch.createVector(clientWidth, clientHeight)
    const max = sketch.createVector(right, height / 2)
    const min = sketch.createVector(left, -height / 2)

    sketch.shader(sketch.mandlebrotSetShader)

  }

  /** Draws the sketch */
  function draw() {
    sketch.mandlebrotSetShader.setUniform('u_resolution', [clientWidth, clientHeight])
    sketch.mandlebrotSetShader.setUniform('u_zoomCenter', [0.0, 0.0])
    sketch.mandlebrotSetShader.setUniform('u_zoomSize', 2.0)
    sketch.mandlebrotSetShader.setUniform('u_maxIterations', 100)

    sketch.push()
    // sketch.fill(120)
    sketch.rect(-clientWidth, -clientHeight, clientWidth * 2, clientHeight * 2)
    sketch.pop()
  }

  sketch.reset = () => reset()
  sketch.preload = () => preload()
  sketch.setup = () => setup()
  sketch.draw = () => draw()
}