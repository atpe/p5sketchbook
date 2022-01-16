/**
 * @module RayCasting
 * @author Adam Evans
 */

// MUI component imports
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Local component imports
import World from './components/world'

const obstacleLimit = 100

export function rayCastingActions(actions) {
  return (
    <>
      <CardContent>
        <Typography>
          Use the W, A, S, and D keys to move the caster around to see how its rays interact with the boundaries.
        </Typography>
        <Typography>
          Click the mouse to insert an obstacle. (Limited to {obstacleLimit}).
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => { actions.reset(); e.preventDefault() }}>Reset</Button>
      </CardActions >
    </>
  )
}

/** Main rayCasting sketch function
 *  @param {Function} sketch The p5.js sketch function
 *  @param {React.RefObject} sketch The p5.js sketch function
 */
export function rayCastingSketch(sketch, sketchRef) {
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
    sketch.world.reset()
  }

  /** Sets up the sketch */
  function setup() {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const size = sketch.createVector(clientWidth, clientHeight)

    sketch.world = new World(center, size)
  }

  /** Is called when mouse is pressed */
  function mousePressed() {
    const position = sketch.createVector(sketch.mouseX, sketch.mouseY)
    if (sketch.world.contains(position) && sketch.world.obstacles.length <= obstacleLimit) {
      sketch.world.addObstacle(position)
    }
  }

  /** Draws the sketch */
  function draw() {
    sketch.background(120)
    sketch.world.update(sketch)
  }

  sketch.start = () => start()
  sketch.pause = () => pause()
  sketch.reset = () => reset()
  sketch.setup = () => setup()
  sketch.mousePressed = () => mousePressed()
  sketch.draw = () => draw()
}