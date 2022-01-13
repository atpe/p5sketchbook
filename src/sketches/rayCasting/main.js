import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Caster from './components/caster'
import Box from './components/box'
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
 *  @param {Object} sketch The p5.js sketch function
 */
export function rayCastingSketch(sketch, sketchRef) {
  const { clientWidth, clientHeight } = sketchRef.current

  sketch.reset = () => {
    sketch.world.reset()
  }

  /** Setup function invoked by p5 */
  sketch.setup = () => {
    sketch.createCanvas(clientWidth, clientHeight)
    sketch.frameRate(60)
    sketch.rectMode(sketch.CENTER)

    const center = sketch.createVector(clientWidth / 2, clientHeight / 2)
    const size = sketch.createVector(clientWidth, clientHeight)

    sketch.world = new World(center, size)
  }

  sketch.mousePressed = () => {
    const position = sketch.createVector(sketch.mouseX, sketch.mouseY)
    if (sketch.world.contains(position) && sketch.world.obstacles.length <= obstacleLimit) {
      sketch.world.addObstacle(position)
    }
  }

  /** Draw function invoked by p5 */
  sketch.draw = () => {
    sketch.background(120)

    sketch.world.update(sketch)
  }
}